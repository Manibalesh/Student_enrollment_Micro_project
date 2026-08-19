from flask import Flask, render_template, request, jsonify
import mysql.connector
from mysql.connector import Error
from datetime import datetime

app = Flask(__name__)

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "YOUR_MYSQL_PASSWORD",
    "database": "SCHOOL-DB",
}

def get_connection():
    return mysql.connector.connect(**DB_CONFIG)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/student/<int:roll_no>", methods=["GET"])
def get_student(roll_no):
    conn = None
    cursor = None
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT `Roll-No`, `Full-Name`, `Class`, `Birth-Date`,
                   `Address`, `Enrollment-Date`
            FROM `STUDENT-TABLE`
            WHERE `Roll-No` = %s
        """, (roll_no,))
        row = cursor.fetchone()

        if not row:
            return jsonify({"exists": False})

        for key in ["Birth-Date", "Enrollment-Date"]:
            if row[key]:
                row[key] = row[key].strftime("%Y-%m-%d")

        return jsonify({"exists": True, "student": row})
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if cursor: cursor.close()
        if conn and conn.is_connected(): conn.close()

def validate(data):
    fields = ["roll_no", "full_name", "student_class", "birth_date",
              "address", "enrollment_date"]
    if any(not str(data.get(f, "")).strip() for f in fields):
        return "All fields are required."
    try:
        int(data["roll_no"])
    except ValueError:
        return "Roll No must be a number."
    try:
        datetime.strptime(data["birth_date"], "%Y-%m-%d")
        datetime.strptime(data["enrollment_date"], "%Y-%m-%d")
    except ValueError:
        return "Dates must be valid."
    return None

@app.route("/student", methods=["POST"])
def save_student():
    data = request.get_json()
    error = validate(data)
    if error:
        return jsonify({"success": False, "message": error}), 400

    conn = None
    cursor = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO `STUDENT-TABLE`
            (`Roll-No`, `Full-Name`, `Class`, `Birth-Date`,
             `Address`, `Enrollment-Date`)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            int(data["roll_no"]), data["full_name"].strip(),
            data["student_class"].strip(), data["birth_date"],
            data["address"].strip(), data["enrollment_date"]
        ))
        conn.commit()
        return jsonify({"success": True, "message": "Student saved successfully."})
    except Error as e:
        if conn: conn.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if cursor: cursor.close()
        if conn and conn.is_connected(): conn.close()

@app.route("/student/<int:roll_no>", methods=["PUT"])
def update_student(roll_no):
    data = request.get_json()
    data["roll_no"] = str(roll_no)
    error = validate(data)
    if error:
        return jsonify({"success": False, "message": error}), 400

    conn = None
    cursor = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE `STUDENT-TABLE`
            SET `Full-Name`=%s, `Class`=%s, `Birth-Date`=%s,
                `Address`=%s, `Enrollment-Date`=%s
            WHERE `Roll-No`=%s
        """, (
            data["full_name"].strip(), data["student_class"].strip(),
            data["birth_date"], data["address"].strip(),
            data["enrollment_date"], roll_no
        ))
        conn.commit()
        return jsonify({"success": True, "message": "Student updated successfully."})
    except Error as e:
        if conn: conn.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if cursor: cursor.close()
        if conn and conn.is_connected(): conn.close()

if __name__ == "__main__":
    app.run(debug=True)
