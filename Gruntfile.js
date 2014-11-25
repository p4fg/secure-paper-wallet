module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		combine: {
			single: {
				input: "./src/securepaperwallet-ui.html",
				output: "./securepaperwallet.html",
				tokens: [
					{ token: "//array.map.js", file: "./src/array.map.js" },
					{ token: "//biginteger.js", file: "./src/biginteger.js" },
					{ token: "//bitcoinjs-lib.js", file: "./src/bitcoinjs-lib.js" },
					{ token: "//bitcoinjs-lib.address.js", file: "./src/bitcoinjs-lib.address.js" },
					{ token: "//bitcoinjs-lib.base58.js", file: "./src/bitcoinjs-lib.base58.js" },
					{ token: "//bitcoinjs-lib.ecdsa.js", file: "./src/bitcoinjs-lib.ecdsa.js" },
					{ token: "//bitcoinjs-lib.eckey.js", file: "./src/bitcoinjs-lib.eckey.js" },
					{ token: "//bitcoinjs-lib.util.js", file: "./src/bitcoinjs-lib.util.js" },
					{ token: "//cryptojs.js", file: "./src/cryptojs.js" },
					{ token: "//cryptojs.sha256.js", file: "./src/cryptojs.sha256.js" },
					{ token: "//cryptojs.pbkdf2.js", file: "./src/cryptojs.pbkdf2.js" },
					{ token: "//cryptojs.hmac.js", file: "./src/cryptojs.hmac.js" },
					{ token: "//cryptojs.aes.js", file: "./src/cryptojs.aes.js" },
					{ token: "//cryptojs.blockmodes.js", file: "./src/cryptojs.blockmodes.js" },
					{ token: "//cryptojs.ripemd160.js", file: "./src/cryptojs.ripemd160.js" },
					{ token: "//crypto-scrypt.js", file: "./src/crypto-scrypt.js" },
					{ token: "//ellipticcurve.js", file: "./src/ellipticcurve.js" },
					{ token: "//secrets.js", file: "./src/secrets.js" },
					{ token: "//ninja.key.js", file: "./src/ninja.key.js" },
					{ token: "//ninja.misc.js", file: "./src/ninja.misc.js" },
					{ token: "//ninja.onload.js", file: "./src/ninja.onload.js" },
					{ token: "//ninja.detailwallet.js", file: "./src/ninja.detailwallet.js" },
					{ token: "//qrcode.js", file: "./src/qrcode.js" },
					{ token: "//securerandom.js", file: "./src/securerandom.js" },
					{ token: "//jquery-2.1.1.min.js", file: "./src/jquery-2.1.1.min.js" },
					{ token: "//bootstrap.js", file: "./src/bootstrap.js" },
					{ token: "//bootstrap.css", file: "./src/bootstrap.css" },
					{ token: "//main.css", file: "./src/main.css" }
				]
			}
		}
	});

	grunt.file.defaultEncoding = 'utf-8';
	grunt.loadNpmTasks("grunt-combine");
	grunt.registerTask("default", ["combine:single"]);
};
