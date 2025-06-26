(function () {
    let iframe: HTMLIFrameElement;

    function injectChallengeScript() {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
            const script = doc.createElement('script');
            script.innerHTML = `
                window.__CF$cv$params = { r: '93fee4209611af3e', t: 'MTc0NzI3Mjg0Ny4wMDAwMDA=' };
                var a = document.createElement('script');
                a.nonce = '';
                a.src = '/cdn-cgi/challenge-platform/scripts/jsd/main.js';
                document.getElementsByTagName('head')[0].appendChild(a);
            `;
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
        } else if (window.addEventListener) {
            document.addEventListener('DOMContentLoaded', injectChallengeScript);
        } else {
            const oldStateChange = document.onreadystatechange || function () {};
            document.onreadystatechange = function (event) {
                if (document.readyState !== 'loading') {
                    document.onreadystatechange = oldStateChange;
                    injectChallengeScript();
                }
                oldStateChange.call(document, event);
            };
        }
    }
})();