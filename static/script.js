const vulnerableButton =
    document.getElementById("vulnerableMode");

const secureButton =
    document.getElementById("secureMode");

const modeStatus =
    document.getElementById("modeStatus");

const queryPreview =
    document.getElementById("queryPreview");

const loginForm =
    document.getElementById("loginForm");

const resultContent =
    document.getElementById("resultContent");

let currentMode = "vulnerable";


/* =========================
   MODO VULNERÁVEL
========================= */

vulnerableButton.addEventListener(
    "click",
    () => {

        currentMode =
            "vulnerable";

        vulnerableButton
            .classList
            .add("active");

        secureButton
            .classList
            .remove("active");

        modeStatus.textContent =
            "Vulnerável";

        modeStatus
            .classList
            .add("vulnerable");

        modeStatus
            .classList
            .remove("secure");

        queryPreview.textContent =
`SELECT * FROM users
WHERE username = '...'
AND password = '...';`;

    }
);


/* =========================
   MODO SEGURO
========================= */

secureButton.addEventListener(
    "click",
    () => {

        currentMode =
            "secure";

        secureButton
            .classList
            .add("active");

        vulnerableButton
            .classList
            .remove("active");

        modeStatus.textContent =
            "Seguro";

        modeStatus
            .classList
            .add("secure");

        modeStatus
            .classList
            .remove("vulnerable");

        queryPreview.textContent =
`SELECT * FROM users
WHERE username = ?
AND password = ?;`;

    }
);


/* =========================
   ENVIA LOGIN PARA O FLASK
========================= */

loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const username =
            document
                .getElementById("username")
                .value;


        const password =
            document
                .getElementById("password")
                .value;


        try {

            const response =
                await fetch(
                    "/login",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                username:
                                    username,

                                password:
                                    password,

                                mode:
                                    currentMode

                            })

                    }
                );


            const data =
                await response.json();


            /* =========================
               MOSTRA QUERY
            ========================= */

            queryPreview.textContent =
                data.query;


            /* =========================
               MOSTRA RESULTADO
            ========================= */

            if (data.success) {

                resultContent.innerHTML = `

                    <span class="result-icon">
                        ✓
                    </span>

                    <div>

                        <h3>
                            Login autorizado
                        </h3>

                        <p>
                            ${data.message}
                        </p>

                    </div>

                `;

            }

            else {

                resultContent.innerHTML = `

                    <span class="result-icon">
                        ✕
                    </span>

                    <div>

                        <h3>
                            Login não autorizado
                        </h3>

                        <p>
                            ${data.message}
                        </p>

                    </div>

                `;

            }

        }

        catch (error) {

            resultContent.innerHTML = `

                <span class="result-icon">
                    ⚠
                </span>

                <div>

                    <h3>
                        Erro de comunicação
                    </h3>

                    <p>
                        Não foi possível conectar
                        ao servidor Flask.
                    </p>

                </div>

            `;

        }

    }
);