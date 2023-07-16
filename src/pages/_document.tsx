import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}
	// <script>window.CompleteGreet_ID="15a8335b-7c3a-4a65-bae7-3e1d75bef994";(function (s, a, l, u, t, e) {t = a.createElement(l),e = a.getElementsByTagName(l)[0];t.async = 1;t.src = u;e.parentNode.insertBefore(t, e)})(window, document, 'script', 'https://complete-greet.onrender.com/js/CompleteGreetInstallation.js');</script>

	// <script>window.CompleteGreet_ID="8c1e662a-08e8-b9a4-5492-8f20ebee0636";(function (s, a, l, u, t, e) {t = a.createElement(l),e = a.getElementsByTagName(l)[0];t.async = 1;t.src = u;e.parentNode.insertBefore(t, e)})(window, document, 'script', 'http://127.0.0.1:5000/js/CompleteGreetInstallation.js');</script>

	render() {
		return (
			<Html lang="en">
				<Head>
					{/* <script
						dangerouslySetInnerHTML={{
							__html: `window.CompleteGreet_ID="8c1e662a-08e8-b9a4-5492-8f20ebee0636";(function (s, a, l, u, t, e) {t = a.createElement(l),e = a.getElementsByTagName(l)[0];t.async = 1;t.src = u;e.parentNode.insertBefore(t, e)})(window, document, 'script', 'http://127.0.0.1:5000/js/CompleteGreetInstallation.js');`,
						}}
					></script> */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
