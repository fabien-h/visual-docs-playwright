export const generateLayout = (
    projectName: string,
    flowTitle: string,
    repositoryUrl: string,
    navigation: string,
    content: string
): string => `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${flowTitle} // ${projectName}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <style>
        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: "Space Grotesk", serif;
            font-optical-sizing: auto;
            font-weight: 400;
            font-style: normal;
            line-height: 1.5;
            background-color: #000;
            color: #999;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            border-width: 0;
            border-style: solid;
        }

        menu, ul {
            list-style: none;
            margin: 0;
            padding: 0
        }

        hr {
            height: 0;
            color: inherit;
            border-top-width: 1px;
            border-color: #333;
        }

        h1, h2, h3, h4, h5, h6 {
            color: #fff;
        }

        a {
            color: #fff;
        }

        ::selection {
            color: #000;
            background: #fff;
        }

        .mono {
            font-family: "Space Mono", monospace;
            font-style: normal;
        }

        #pageHeader {
            padding: 30px 0;
            border-bottom: 1px solid #333;
        }

        #pageHeader > div {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            width: calc(100% - 40px);
            max-width: 1500px;
            flex-wrap: wrap;
            margin: 0 auto;
        }
            
        #pageHeader h1 {
            font-size: 24px;
            line-height: 1;
            display: block;
        }

        #pageHeader a {
            display: flex;
            align-items: center;
            text-decoration: none;
        }

        #pageHeader a svg {
            width: 25px;
            height: 25px;
            fill: #fff;
        }

        #pageHeader p {
            font-size: 14px;
            width: 100%;
            flex-shrink: 0;
            flex-grow: 0;
        }

        #root {
            display: flex;
            position: relative;
            width: calc(100% - 40px);
            max-width: 1500px;
            margin: 0 auto;
            align-items: flex-start;
        }

        #site-navigation {
            width: 275px;
            overflow-y: auto;
            padding: 5px 0 50px 0;
            flex-shrink: 0;
            flex-grow: 0;
            position: sticky;
            top: 0;
        }

        #site-navigation > h3 {
            padding: 25px 0 15px 0;
            color: #fff;
            font-size: 14px;
        }
            
        #site-navigation > a {
            font-size: 14px;
            display: block;
            padding: 5px 0 5px 20px;
            color: #999;
            text-decoration: none;
            border-left: 1px solid #333;
        }
            
        #site-navigation > a:hover, #site-navigation > a.active {
            color: #ccc;
            border-left: 1px solid #ccc;
        }

        #main {
            padding: 30px 50px 100px 50px;
            flex-grow: 1;
            border-left: 1px solid #333;
        }

        #main > header {
            margin-bottom: 60px;
        }

        #main > header > h1 {
            line-height: 1;
        }
        
        #main > header > p {
            font-size: 14px;
            margin: 0;
        }

        #main > .description {
            margin-bottom: 60px;
        }

        #main h2 {
            margin: 30px 0 20px 0;
        }

        #main h3 {
            margin: 20px 0 10px 0;
        }

        #main h4 {
            margin: 15px 0 10px 0;
        }

        #main blockquote {
            padding: 15px 20px;
            border-left: 5px solid #333;
            margin: 20px 0;
            background-color: #222;
            color: #ccc;
        }

        #main blockquote p {
            margin: 0;
        }

        #main p {
            margin-bottom: 15px;
        }
        
        #main ul {
            margin-bottom: 15px;
        }

        #main ul li {
            margin: 5px 0;
            position: relative;
            padding-left: 20px;
        }

        #main ul li:before {
            content: "";
            width: 6px;
            height: 6px;
            position: absolute;
            border-radius: 50%;
            background-color: #666;
            display: block;
            left: 0;
            top: 8px;
        }

        main #ol {
            margin-bottom: 15px;
            padding-left: 20px;
        }

        #main ol li {
            margin: 5px 0 5px 20px;
            padding-left: 10px;
        }

        #page-navigation {
            padding: 30px 0 50px 30px;
            border-left: 1px solid #333;
            width: 275px;
            flex-grow: 0;
            flex-shrink: 0;
            position: sticky;
            top: 0;
            overflow-y: auto;
            display: none;
        }

        @media (min-width: 1100px) {
            #page-navigation {
                display: block;
            }
        }

        #page-navigation > h2 {
            margin-bottom: 15px;
            font-size: 14px;
        }

        #page-navigation > a {
            display: block;
            padding: 4px 0;
            color: #999;
            text-decoration: none;
            font-size: 14px;
        }

        #page-navigation > a:hover {
            color: #ccc;
        }

        .imgs-container {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .imgs-container >.img-container {
            margin: 20px 0;
            border-radius: 10px;
            border: 1px solid #333;
            padding: 10px;
            background-color: #222;
            overflow: hidden;
            height: 175px;
            padding: 5px;
        }
            
        .imgs-container >.img-container > img {
            border-radius: 5px;
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
            cursor: zoom-in;
            transition: background-color 0.3s ease-in-out;
        }

        .imgs-container >.img-container > img.fullscreen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            cursor: zoom-out;
            background-color: #000000cc;
            padding: 20px;
        }
    </style>
</head>
<body>
    <header id="pageHeader">
        <div>
            <h1>${projectName}</h1>
            ${repositoryUrl?.includes('github.com') ? `<a href="${repositoryUrl}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>github</title><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" /></svg>
            </a>` : ''}
            <p>Documentation generated from tests</p>
        </div>
    </header>
    <div id="root">
        ${navigation}
        ${content}
    </div>

    <script>
        document.querySelectorAll('.img-container > img').forEach(img => {
            img.addEventListener('click', () => {
                img.classList.toggle('fullscreen');
            });
        });
    </script>
</body>
</html>`.trim();
