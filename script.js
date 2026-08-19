const form = document.getElementById("studentForm");
const rollNo = document.getElementById("roll_no");
const fullName = document.getElementById("full_name");
const studentClass = document.getElementById("student_class");
const birthDate = document.getElementById("birth_date");
const address = document.getElementById("address");
const enrollmentDate = document.getElementById("enrollment_date");

const saveBtn = document.getElementById("saveBtn");
const updateBtn = document.getElementById("updateBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");

const otherFields = [fullName, studentClass, birthDate, address, enrollmentDate];

function showMessage(text, type) {
    message.textContent = text;
    message.className = "message " + type;
}

function clearMessage() {
    message.textContent = "";
    message.className = "message";
}

function resetForm() {
    form.reset();

    rollNo.disabled = false;
    otherFields.forEach(field => field.disabled = true);

    saveBtn.disabled = true;
    updateBtn.disabled = true;
    resetBtn.disabled = true;

    clearMessage();
    rollNo.focus();
}

function enableNewRecord() {
    otherFields.forEach(field => field.disabled = false);

    saveBtn.disabled = false;
    updateBtn.disabled = true;
    resetBtn.disabled = false;

    fullName.focus();
}

function enableExistingRecord(student) {
    fullName.value = student["Full-Name"];
    studentClass.value = student["Class"];
    birthDate.value = student["Birth-Date"];
    address.value = student["Address"];
    enrollmentDate.value = student["Enrollment-Date"];

    rollNo.disabled = true;
    otherFields.forEach(field => field.disabled = false);

    saveBtn.disabled = true;
    updateBtn.disabled = false;
    resetBtn.disabled = false;

    fullName.focus();
}

async function checkRollNo() {
    clearMessage();

    const value = rollNo.value.trim();

    if (!value || Number(value) <= 0) {
        showMessage("Enter a valid Roll No.", "error");
        rollNo.focus();
        return;
    }

    try {
        const response = await fetch(`/student/${encodeURIComponent(value)}`);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Unable to check Roll No.");
        }

        if (result.exists) {
            enableExistingRecord(result.student);
        } else {
            enableNewRecord();
        }
    } catch (error) {
        showMessage(error.message, "error");
    }
}

function getFormData() {
    return {
        roll_no: rollNo.value.trim(),
        full_name: fullName.value.trim(),
        student_class: studentClass.value.trim(),
        birth_date: birthDate.value,
        address: address.value.trim(),
        enrollment_date: enrollmentDate.value
    };
}

function validateForm() {
    const data = getFormData();

    for (const [key, value] of Object.entries(data)) {
        if (!value) {
            showMessage("All fields are required.", "error");
            return false;
        }
    }

    if (Number(data.roll_no) <= 0) {
        showMessage("Roll No must be a positive number.", "error");
        return false;
    }

    return true;
}

async function saveStudent() {
    if (!validateForm()) return;

    try {
        const response = await fetch("/student", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(getFormData())
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Save failed.");
        }

        alert(result.message);
        resetForm();
    } catch (error) {
        showMessage(error.message, "error");
    }
}

async function updateStudent() {
    if (!validateForm()) return;

    try {
        const response = await fetch(`/student/${encodeURIComponent(rollNo.value)}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(getFormData())
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Update failed.");
        }

        alert(result.message);
        resetForm();
    } catch (error) {
        showMessage(error.message, "error");
    }
}

rollNo.addEventListener("blur", checkRollNo);

rollNo.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        checkRollNo();
    }
});

saveBtn.addEventListener("click", saveStudent);
updateBtn.addEventListener("click", updateStudent);
resetBtn.addEventListener("click", resetForm);

window.addEventListener("load", resetForm);
