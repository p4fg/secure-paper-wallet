ninja.wallets.detailwallet = {
	open: function () {
		document.getElementById("detailprivkey").focus();
	},

	close: function () {
		
	},

	openCloseFaq: function (faqNum) {
		// do close
		if (document.getElementById("detaila" + faqNum).style.display == "block") {
			document.getElementById("detaila" + faqNum).style.display = "none";
			document.getElementById("detaile" + faqNum).setAttribute("class", "more");
		}
		// do open
		else {
			document.getElementById("detaila" + faqNum).style.display = "block";
			document.getElementById("detaile" + faqNum).setAttribute("class", "less");
		}
	},

	viewDetails: function () {
		var bip38 = false;
		var key = document.getElementById("detailprivkey").value.toString().replace(/^\s+|\s+$/g, ""); // trim white space
		key = key.replace(/\s/g,"") // Trim spaces inside key
		document.getElementById("detailprivkey").value = key;
		var bip38CommandDisplay = document.getElementById("detailbip38commands").style.display;
		ninja.wallets.detailwallet.clear();
		if (key == "") {
			return;
		}

		if (ninja.privateKey.isBIP38Format(key)) {
			document.getElementById("detailbip38commands").style.display = bip38CommandDisplay;
			if (bip38CommandDisplay != "block") {
				document.getElementById("detailbip38commands").style.display = "block";
				document.getElementById("detailprivkeypassphrase").focus();
				return;
			}
			var passphrase = document.getElementById("detailprivkeypassphrase").value.toString().replace(/^\s+|\s+$/g, ""); // trim white space
			if (passphrase == "") {
				alert("BIP38 passphrase required");
				return;
			}
			// show Private Key BIP38 Format
			$( ".busydecrypting" ).show();
			document.getElementById("detailprivbip38").innerHTML = key;
			ninja.privateKey.BIP38EncryptedKeyToByteArrayAsync(key, passphrase, function (btcKeyOrError) {
				if (btcKeyOrError.message) {
					alert(btcKeyOrError.message);
					ninja.wallets.detailwallet.clear();
				} else {
					ninja.wallets.detailwallet.populateKeyDetails(new Bitcoin.ECKey(btcKeyOrError));
				}
				$( ".busydecrypting" ).hide();
			});
			
		}
		else {
			var btcKey = new Bitcoin.ECKey(key);
			if (Bitcoin.ECKey.isMiniFormat(key)) {
				// show Private Key Mini Format
				document.getElementById("detailprivmini").innerHTML = key;
				document.getElementById("detailmini").style.display = "inline-block";
			}
			else if (Bitcoin.ECKey.isBase6Format(key)) {
				// show Private Key Base6 Format
				document.getElementById("detailprivb6").innerHTML = key;
				document.getElementById("detailb6").style.display = "inline-block";
			}
			ninja.wallets.detailwallet.populateKeyDetails(btcKey);
		}
	},

	addSpaces: function (str,n) {
		re = new RegExp('.{1,' + n + '}', 'g');
		return str.match(re).join(' ')
	},

	populateKeyDetails: function (btcKey) {
		if (btcKey.priv != null) {
			$( ".detailinfo" ).show();
			btcKey.setCompressed(false);
			document.getElementById("detailprivhex").innerHTML = ninja.wallets.detailwallet.addSpaces(btcKey.toString().toLowerCase(),8);
			document.getElementById("detailprivb64").innerHTML = btcKey.toString("base64");
			var bitcoinAddress = btcKey.getBitcoinAddress();
			var wif = btcKey.getBitcoinWalletImportFormat();
			document.getElementById("detailpubkey").innerHTML = ninja.wallets.detailwallet.addSpaces(btcKey.getPubKeyHex().toLowerCase(),8);
			document.getElementById("detailaddress").innerHTML = bitcoinAddress;
			document.getElementById("detailprivwif").innerHTML = ninja.wallets.detailwallet.addSpaces(wif,6)
			btcKey.setCompressed(true);
			var bitcoinAddressComp = btcKey.getBitcoinAddress();
			var wifComp = btcKey.getBitcoinWalletImportFormat();
			document.getElementById("detailpubkeycomp").innerHTML = ninja.wallets.detailwallet.addSpaces(btcKey.getPubKeyHex().toLowerCase(),8);
			document.getElementById("detailaddresscomp").innerHTML = bitcoinAddressComp;
			document.getElementById("detailprivwifcomp").innerHTML = ninja.wallets.detailwallet.addSpaces(wifComp,6);

			ninja.qrCode.showQrCode({
				"detailqrcodepublic": bitcoinAddress,
				"detailqrcodepubliccomp": bitcoinAddressComp
			}, 3);
			ninja.qrCode.showQrCode({
				"detailqrcodeprivate": wif,
				"detailqrcodeprivatecomp": wifComp
			}, 6);

			document.getElementById("envelopedetailaddress").innerHTML = bitcoinAddress;
			ninja.qrCode.showQrCode({
				"envelopeblockrio": "http://btc.blockr.io/address/info/" + bitcoinAddress,
				"envelopeblockchaininfo": "https://blockchain.info/address/" + bitcoinAddress,
				"envelopedetailqrcodepublic": bitcoinAddress
			}, 3,100,100);
		}
	},

	clear: function () {
		document.getElementById("detailpubkey").innerHTML = "";
		document.getElementById("detailpubkeycomp").innerHTML = "";
		document.getElementById("detailaddress").innerHTML = "";
		document.getElementById("detailaddresscomp").innerHTML = "";
		document.getElementById("detailprivwif").innerHTML = "";
		document.getElementById("detailprivwifcomp").innerHTML = "";
		document.getElementById("detailprivhex").innerHTML = "";
		document.getElementById("detailprivb64").innerHTML = "";
		document.getElementById("detailprivb6").innerHTML = "";
		document.getElementById("detailprivmini").innerHTML = "";
		document.getElementById("detailprivbip38").innerHTML = "";
		document.getElementById("detailqrcodepublic").innerHTML = "";
		document.getElementById("detailqrcodepubliccomp").innerHTML = "";
		document.getElementById("detailqrcodeprivate").innerHTML = "";
		document.getElementById("detailqrcodeprivatecomp").innerHTML = "";

		document.getElementById("envelopedetailaddress").innerHTML = "";
		document.getElementById("envelopeblockrio").innerHTML = "";
		document.getElementById("envelopeblockchaininfo").innerHTML = "";
		document.getElementById("envelopedetailqrcodepublic").innerHTML = "";

		document.getElementById("detailb6").style.display = "none";
		document.getElementById("detailmini").style.display = "none";
		document.getElementById("detailbip38commands").style.display = "none";
		document.getElementById("detailbip38").style.display = "none";
	}
};