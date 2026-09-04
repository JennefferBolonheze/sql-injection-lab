# sql-injection-lab
Educational SQL Injection lab built with Python, Flask and SQLite to demonstrate vulnerable queries and secure coding practices in a controlled environment.
# 🧪 SQL Injection Lab

Laboratório educacional desenvolvido para demonstrar, de forma simples e visual, a diferença entre consultas SQL vulneráveis e consultas parametrizadas.

O projeto simula um sistema de autenticação utilizando **Python, Flask e SQLite**, permitindo alternar entre um modo vulnerável e um modo seguro.

> ⚠️ Este projeto possui finalidade exclusivamente educacional e utiliza apenas dados fictícios em um ambiente local controlado.

---

## 🎯 Objetivo

O objetivo deste projeto é estudar conceitos relacionados a:

- SQL Injection
- Segurança de aplicações web
- Validação de entradas
- Consultas SQL parametrizadas
- Desenvolvimento backend com Flask
- Integração entre frontend e backend
- Banco de dados SQLite

---

## 🛡️ Modos do laboratório

### ⚠️ Vulnerable Mode

Neste modo, a aplicação demonstra uma construção insegura de consulta SQL, na qual valores fornecidos pelo usuário são incorporados diretamente à consulta.

Exemplo conceitual:

```sql
SELECT * FROM users
WHERE username = 'entrada'
AND password = 'entrada';