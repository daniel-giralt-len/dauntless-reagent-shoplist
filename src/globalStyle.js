
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`		
	/* latin-ext */
	@font-face {
		font-family: 'Marcellus';
		font-style: normal;
		font-weight: 400;
		src: local('Marcellus'), local('Marcellus-Regular'), url(https://fonts.gstatic.com/s/marcellus/v7/wEO_EBrOk8hQLDvIAF81WPoK7Es.woff2) format('woff2');
		unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
	}
	/* latin */
	@font-face {
		font-family: 'Marcellus';
		font-style: normal;
		font-weight: 400;
		src: local('Marcellus'), local('Marcellus-Regular'), url(https://fonts.gstatic.com/s/marcellus/v7/wEO_EBrOk8hQLDvIAF81VvoK.woff2) format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}

	body {
		padding: 0;
		margin: 5px;
		font-family: Marcellus;
		color: #FFF;
		font-weight: bold;
		text-shadow: #081d2b 2px 2px 3px;
		font-size: 20px;
		background-attachment: fixed;
		background-image: url(./assets/background/background_image.jpg);
		@media (max-width: 1000px) {
			background-image: url(./assets/background/background_image_small.jpg);
		}
	}
`

export default GlobalStyle