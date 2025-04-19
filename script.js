const form = document.getElementById('ageForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;

    if (!name || !dob) {
        resultDiv.textContent = 'Пожалуйста, заполните все поля.';
        return;
    }


    try {
        const response = await fetch('/api/calculate-age', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, dob })
        });

        const data = await response.json();

        if (response.ok) {
            resultDiv.textContent = `${data.name}, вам ${data.age} лет.`;
        } else {
            resultDiv.textContent = data.error || 'Ошибка вычисления';
        }
    } catch (err) {
        resultDiv.textContent = 'Ошибка соединения с сервером';
    }
});