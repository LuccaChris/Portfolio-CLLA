var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.getElementById('menu-toggle');
    var menuClose = document.getElementById('menu-close');
    var mobileMenu = document.getElementById('mobile-menu');
    var mobileLinks = document.querySelectorAll('.mobile-link');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
        });
    }
    if (menuClose && mobileMenu) {
        menuClose.addEventListener('click', function () {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
    }
    mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }
        });
    });
    var form = document.querySelector('form');
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (e) { return __awaiter(_this, void 0, void 0, function () {
        var nome, email, conteudo, payload, res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    nome = document.getElementById('name').value;
                    email = document.getElementById('email').value;
                    conteudo = document.getElementById('message').value;
                    payload = { nome: nome, email: email, conteudo: conteudo };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch('https://portfolio-clla.onrender.com/api/formulario', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(payload)
                        })];
                case 2:
                    res = _a.sent();
                    if (res.ok) {
                        alert('Mensagem enviada com sucesso!');
                        form.reset();
                    }
                    else {
                        alert('Erro ao enviar mensagem');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    alert('Erro de conexão com o servidor');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
function downloadcv() {
    var link = document.createElement('a');
    link.href = 'assets/curriculo/Currículo Christian 2025.pdf'; // caminho correto no seu projeto
    link.download = 'Christian_Amaral_Curriculo.pdf'; // nome do arquivo ao baixar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
// Exemplo: conectar com o botão via id
document.addEventListener("DOMContentLoaded", function () {
    var downloadButton = document.getElementById('btn-download-cv');
    if (downloadButton) {
        downloadButton.addEventListener('click', downloadcv);
    }
});
