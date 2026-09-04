from flask import Flask, render_template, request, jsonify
import sqlite3
import os

app = Flask(__name__)

DB_NAME = "database.db"


# =========================
# CRIA O BANCO
# =========================

def init_db():

    if os.path.exists(DB_NAME):
        return

    connection = sqlite3.connect(DB_NAME)

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL
        )
    """)

    users = [
        ("alice", "lab123"),
        ("bob", "security456"),
        ("admin", "demo789")
    ]

    cursor.executemany(
        """
        INSERT INTO users (username, password)
        VALUES (?, ?)
        """,
        users
    )

    connection.commit()
    connection.close()


# =========================
# PÁGINA PRINCIPAL
# =========================

@app.route("/")
def home():

    return render_template("index.html")


# =========================
# LOGIN DO LABORATÓRIO
# =========================

@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data.get("username", "")
    password = data.get("password", "")
    mode = data.get("mode", "secure")


    connection = sqlite3.connect(DB_NAME)

    cursor = connection.cursor()


    try:

        # =========================
        # MODO VULNERÁVEL
        # =========================

        if mode == "vulnerable":

            query = (
                "SELECT * FROM users "
                f"WHERE username = '{username}' "
                f"AND password = '{password}'"
            )

            cursor.execute(query)

            user = cursor.fetchone()


        # =========================
        # MODO SEGURO
        # =========================

        else:

            query = (
                "SELECT * FROM users "
                "WHERE username = ? "
                "AND password = ?"
            )

            cursor.execute(
                query,
                (username, password)
            )

            user = cursor.fetchone()


        # =========================
        # RESULTADO
        # =========================

        if user:

            return jsonify({

                "success": True,

                "message":
                    f"Login autorizado para {user[1]}.",

                "query": query,

                "mode": mode

            })


        else:

            return jsonify({

                "success": False,

                "message":
                    "Credenciais inválidas.",

                "query": query,

                "mode": mode

            })


    except sqlite3.Error as error:

        return jsonify({

            "success": False,

            "message":
                "A consulta SQL gerou um erro.",

            "error":
                str(error),

            "query":
                query

        })


    finally:

        connection.close()


# =========================
# INICIA O PROJETO
# =========================

if __name__ == "__main__":

    init_db()

    app.run(debug=True)