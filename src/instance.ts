// from source https://github.com/abinnovision/recaptcha-v3/blob/0098ab94871e6a1a57f8f70fd6349f716f0697ce/src/ReCaptchaInstance.ts
import type { IReCaptchaInstance, IRenderParameters } from "./type";

/**
 * Describes the parameters for the explicit rendering call. This gives the possibility to set explicit positioning
 * for the badge.
 */
export interface IReCaptchaExplicitRenderParameters {
	container?: string | Element | HTMLElement;
	badge?: "bottomright" | "bottomleft" | "inline";
	size?: "invisible";
	tabindex?: number;
}

/**
 * A simple wrapper for the "grecaptcha" object.
 *
 * Currently only wraps the "execute" function.
 */
export class ReCaptchaInstance {
	private readonly siteKey: string;
	private readonly recaptcha: IReCaptchaInstance;
	private styleContainer: HTMLStyleElement | null;

	public constructor(
		siteKey: string,
		recaptcha: IReCaptchaInstance
	) {
		this.siteKey = siteKey;
		this.recaptcha = recaptcha;
		this.styleContainer = null;
	}

	public getInstance() {
		return this.recaptcha
	}

	/**
	 * Will init or reinit the recaptcha
	 */
	public ready(callback: () => void) {
		const instance = this.recaptcha.enterprise ?? this.recaptcha
		instance?.ready(callback);
	}

	/**
	 * Will execute the recaptcha with the given action.
	 *
	 * @param action The action to execute with.
	 */
	public async execute(action?: string): Promise<string> {
		const instance = this.recaptcha.enterprise ?? this.recaptcha

		return new Promise<string>((resolve, reject) => {
			this.ready(() => {
				instance.execute
				? (
					instance.execute(this.siteKey, { action }).then((token) => {
						token ? resolve(token) : reject(new Error("Get Token Failure"))
					})
				)
				: reject(new Error("Get Token Failure"))
			})
		})
	}

	/**
	 * Will render explicitly render the ReCaptcha.
	 * @param grecaptcha The grecaptcha instance to use for the rendering.
	 * @param siteKey The sitekey to render.
	 * @param parameters The parameters for the rendering process.
	 * @return The id of the rendered widget.
	 */
	// eslint-disable-next-line max-params
	public render(
		container: string | Element | HTMLElement,
		parameters: IReCaptchaExplicitRenderParameters
	): void {
		const instance = this.recaptcha.enterprise ?? this.recaptcha		

		// Split the given parameters into a matching interface for the grecaptcha.render function.
		const augmentedParameters: IRenderParameters = {
			sitekey: this.siteKey,
			badge: parameters.badge,
			size: parameters.size,
			tabindex: parameters.tabindex,
		};

		// Differ if an explicit container element is given.
		instance?.render(container, augmentedParameters)
	}

	/**
	 * Will return the site key, with which the reCAPTCHA
	 * has been initialized.
	 */
	public getSiteKey(): string {
		return this.siteKey;
	}

	/**
	 * Hides all badges on the current page.
	 *
	 * Warning: The usage of this method is only allowed if you follow
	 * the official guide for hiding the badge from Google:
	 * https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-v3-badge-what-is-allowedl
	 */
	public hideBadge(): void {
		if (this.styleContainer !== null) {
			return;
		}

		this.styleContainer = document.createElement("style");
		this.styleContainer.innerHTML =
			".grecaptcha-badge{visibility:hidden !important;}";
		document.head.appendChild(this.styleContainer);
	}

	/**
	 * Shows the badge again after hiding it.
	 */
	public showBadge(): void {
		if (this.styleContainer === null) {
			return;
		}

		document.head.removeChild(this.styleContainer);
		this.styleContainer = null;
	}
}