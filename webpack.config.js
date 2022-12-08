const path = require('path'); //Függőség injektálás, azt mondom, h erre a függőségre szükségem van, és ezen a változón szeretném elérni ennek a filenak a scopejában.
const CopyWebpackPlugin = require('copy-webpack-plugin'); //Ugyanaz, ezek importok lényegében.
//A JS világban több import megoldás terjedt el, a require egyike ezeknek.
const DIST_DIR = path.resolve(__dirname, 'dist'); //Az aktuális mappánkhoz hozzáfűzi a 'dist' mappát, és ez a DIST_DIR lesz a dist mappánk elérési útvonala. A dist mappába kerül a lebuildelt alkalmazás.


//A LÉNYEG 以下:
//Ezt module.export objectet fogjuk kiexportálni ebből a fájlból
module.exports = {
    entry: './app.js', //Belépési pont, innen indul el az alkalmazás. Ebből alakul ki h mik lesznek a végleges függőségek, amik ténylegesen bele is fordulnak majd az outputba.
    output: {
        path: DIST_DIR, //Ide kerül az output.
        filename: 'bundle.js' //A build kimenet fájlneve.
    }, //Build folyamat kimenete.
    plugins: [
        new CopyWebpackPlugin({ //Ezzel bizonyos fájlokat át lehet másolni a dist mappába.
            patterns: [
                {from: './index.html', to: DIST_DIR} //A projekt gyökerében lévő html fájlt átmásolja a dist mappába. Az index.html-t nem hivatkozzuk a JS fájlba, csak szeretnénk ha a gyökérben maradna ezért csak átmásoljuk.
            ]
        })
    ], //Webpacken belül mindent pluginokkal oldunk meg szinte.
    module: { //CSS-sek betöltése a bundle-be.
        rules: [
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
        ]
    },
    mode: 'development',
devServer: {
            static: {
               directory: DIST_DIR
           },
 }, //A lebuildelt alkalmazásból (DIST_DIR) futtatunk egy devservert.
}