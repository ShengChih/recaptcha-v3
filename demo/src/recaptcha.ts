import { load } from "../../src/ReCaptcha";

(async () => {
	/**
	 * sitekey from https://www.google.com/recaptcha/admin/site/xxxxxxxx
	 *
	 * add your domain:
	 * e.g. localhost
	 * e.g. 127.0.0.1
	 * */
	const recaptcha = await load("your recaptcha v3 sitekey");
	const token = await recaptcha.execute("login");
	console.log(token);
})();
