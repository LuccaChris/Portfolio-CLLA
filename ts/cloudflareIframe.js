(function () {
    var iframe;
    function injectChallengeScript() {
        var _a;
        var doc = iframe.contentDocument || ((_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document);
        if (doc) {
            var script = doc.createElement('script');
            script.innerHTML = "\n                window.__CF$cv$params = { r: '93fee4209611af3e', t: 'MTc0NzI3Mjg0Ny4wMDAwMDA=' };\n                var a = document.createElement('script');\n                a.nonce = '';\n                a.src = '/cdn-cgi/challenge-platform/scripts/jsd/main.js';\n                document.getElementsByTagName('head')[0].appendChild(a);\n            ";
            doc.getElementsByTagName('head')[0].appendChild(script);
        }
    }
    if (document.body) {
        iframe = document.createElement('iframe');
        iframe.height = '1';
        iframe.width = '1';
        iframe.style.position = 'absolute';
        iframe.style.top = '0px';
        iframe.style.left = '0px';
        iframe.style.border = 'none';
        iframe.style.visibility = 'hidden';
        document.body.appendChild(iframe);
        if (document.readyState !== 'loading') {
            injectChallengeScript();
        }
        else if (window.addEventListener) {
            document.addEventListener('DOMContentLoaded', injectChallengeScript);
        }
        else {
            var oldStateChange_1 = document.onreadystatechange || function () { };
            document.onreadystatechange = function (event) {
                if (document.readyState !== 'loading') {
                    document.onreadystatechange = oldStateChange_1;
                    injectChallengeScript();
                }
                oldStateChange_1.call(document, event);
            };
        }
    }
})();
