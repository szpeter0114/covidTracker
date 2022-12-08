export const addCard = (country, date, vaccine, death, flag) => {
    const container = document.getElementById('cards-container');
    const vaccineCheckbox = document.getElementById('checkbox-2');
    const caseCheckbox = document.getElementById('checkbox-1');


    container.insertAdjacentHTML('afterbegin', `
        <zizi-card title="${country} - ${date}">
            <div>
            <img src="${flag}">
            </div>
            <div class="card-content ${caseCheckbox.checked ? "visible" : "hidden"}" id="card-content">
            Number of deaths as of ${date}: <strong>${death}</strong>
            </div>

            <div class="card-content ${vaccineCheckbox.checked ? "visible" : "hidden"}" id="card-content">
                Number of vaccine doses as of ${date}: <strong>${vaccine}</strong>
            </div>
            <div id='btn-div'>
            <button id='del'>Close</button>
            </div>
        </zizi-card>
    `), 

document.querySelector('#del').addEventListener('click', e => e.target.closest('zizi-card').remove(e));

}
