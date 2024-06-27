document.addEventListener('DOMContentLoaded', () => {
    const dataForm = document.getElementById('dataForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const mobileInput = document.getElementById('mobile');
    const addressInput = document.getElementById('address');
    const imageInput = document.getElementById('image');
    const indexInput = document.getElementById('index');
    const dataTable = document.getElementById('dataTable');

    let data = JSON.parse(localStorage.getItem('crudData')) || [];

    function renderTable() {
        dataTable.innerHTML = '';
        data.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.mobile}</td>
                <td>${item.address}</td>
                <td><img src="${item.image}" width="50" /></td>
                <td>
                    <button onclick="editItem(${index})">Edit</button>
                    <button onclick="deleteItem(${index})">Delete</button>
                </td>
            `;
            dataTable.appendChild(row);
        });
    }

    dataForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value;
        const email = emailInput.value;
        const mobile = mobileInput.value;
        const address = addressInput.value;
        const index = indexInput.value;
        const image = imageInput.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            if (index === '') {
                data.push({ name, email, mobile, address, image: reader.result });
            } else {
                data[index] = { name, email, mobile, address, image: reader.result };
            }

            localStorage.setItem('crudData', JSON.stringify(data));
            renderTable();
            clearForm();
        };

        if (image) {
            reader.readAsDataURL(image);
        } else {
            if (index !== '') {
                data[index] = { name, email, mobile, address, image: data[index].image };
                localStorage.setItem('crudData', JSON.stringify(data));
                renderTable();
                clearForm();
            }
        }
    });

    function clearForm() {
        nameInput.value = '';
        emailInput.value = '';
        mobileInput.value = '';
        addressInput.value = '';
        imageInput.value = '';
        indexInput.value = '';
    }

    window.editItem = (index) => {
        const item = data[index];
        nameInput.value = item.name;
        emailInput.value = item.email;
        mobileInput.value = item.mobile;
        addressInput.value = item.address;
        indexInput.value = index;
    };

    window.deleteItem = (index) => {
        data.splice(index, 1);
        localStorage.setItem('crudData', JSON.stringify(data));
        renderTable();
    };

    renderTable();
});
