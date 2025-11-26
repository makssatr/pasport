async function loadData() {
  try {
    const response = await fetch('Him_sostav.json');
    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка:', error);
    return [];
  }
}

function searchProduct() {
  const code = document.getElementById('searchInput').value.trim();
  const resultDiv = document.getElementById('result');

  if (!code) {
    resultDiv.innerHTML = '<p>Введите материал!</p>';
    return;
  }

  loadData().then(data => {
    // Выводим в консоль загруженные материалы
    console.log('Все материалы:', data.map(m => m.Материал));

    const product = data.find(item => item.Материал === code);

    if (product) {
      resultDiv.innerHTML = `
        <h2>Найден материал: ${product.Материал}</h2>
        <table>
          <tr><th>C</th><td>${product.C}</td></tr>
          <tr><th>Si</th><td>${product.Si}</td></tr>
          <tr><th>Mn</th><td>${product.Mn}</td></tr>
          <tr><th>Cr</th><td>${product.Cr}</td></tr>
          <tr><th>Предел прочности (σв)</th><td>${product["Предел прочности, σв, МПа"]}</td></tr>
        </table>
      `;
    } else {
      resultDiv.innerHTML = `<p>Материал "${code}" не найден!</p>`;
      console.log('Не найдено:', code);
    }
  });
}
