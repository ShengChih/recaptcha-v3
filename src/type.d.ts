// source from https://github.com/abinnovision/recaptcha-v3/blob/0098ab94871e6a1a57f8f70fd6349f716f0697ce/src/grecaptcha/grecaptcha.ts
interface GrecaptchaConfig {
  fns?: (() => void)[];
}

declare global {
	const grecaptcha: IReCaptchaInstance;

	interface Window {
		grecaptcha: IReCaptchaInstance;
		__grecaptcha_cfg?: GrecaptchaConfig;
	}
}

export interface IReCaptchaInstance {
	ready?: ((callback: () => void) => void) | undefined;

	/**
	 * Will execute the ReCaptcha using the given SiteKey and the given options.
	 * @param siteKey The ReCaptcha SiteKey.
	 * @param options The options for the execution. (Only known property is "action")
	 */
	execute?: ((siteKey: string, options: IExecuteOptions) => Promise<string>) | undefined;

	/**
	 * Will render the ReCaptcha widget into the given container with the given parameters. This render function is
	 * useful when using `badge: 'inline'`, which lets you render the ReCaptcha widget into the given container and
	 * let's you style it with CSS by yourself.
	 *
	 * @param container The container into which the widget shall be rendered.
	 * @param parameters The rendering parameters for the widget.
	 */
	render?: (((
		container: string | Element,
		parameters: IRenderParameters
	) => string) &
		((parameters: IRenderParameters) => string)) | undefined;

	enterprise?: Omit<IReCaptchaInstance, "enterprise"> | undefined;
}

/**
 * Describes the options for the ReCaptcha execution.
 *
 * @see https://developers.google.com/recaptcha/docs/v3#frontend_integration
 */
export declare interface IExecuteOptions {
	action?: string;
}

/**
 * Describes the rendering parameters for the ReCaptcha widget.
 * The rendering parameters do not differ for v3.
 *
 * @see https://developers.google.com/recaptcha/docs/invisible#render_param
 * @see https://stackoverflow.com/a/53620039
 */
export declare interface IRenderParameters {
	sitekey: string;
	badge?: "bottomright" | "bottomleft" | "inline";
	size?: "invisible";
	tabindex?: number;
}