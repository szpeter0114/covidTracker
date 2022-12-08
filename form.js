import { addCard } from "./cards";
import { getCases, getFlag, getVaccineData } from "./getData";

export const initForm = () => {
    const errorMessage = document.getElementById('error-message');
    const loadingIndicator = document.getElementById('loading');
    const datePicker = document.getElementById('date-input');
    const cardsContainer = document.getElementById('cards-container');
    const submitBtn = document.getElementById('submit-btn');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate() - 1;
    datePicker.max = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
    const maxDate = now;
    maxDate.setDate(now.getDate() - 29);
    const maxDateYear = maxDate.getFullYear();
    const maxDateMonth = maxDate.getMonth() + 1;
    const maxDateDay = maxDate.getDate();
    datePicker.min = `${maxDateYear}-${maxDateMonth < 10 ? `0${maxDateMonth}` : maxDateMonth}-${maxDateDay < 10 ? `0${maxDateDay}` : maxDateDay}`;

    const form = document.querySelector('#form');
    form.addEventListener('submit', async e => {
    const date = document.querySelector('#date-input').value;
    const country = document.querySelector('#country').value;
    loadingIndicator.style.display = 'block';
    
    e.preventDefault();

    loadingIndicator.style.display = 'none';
    submitBtn.disabled = true;
        cardsContainer.insertAdjacentHTML('afterbegin', `<div id="loading" class="loader"></div>`);

        try {
            const vaccineData = await getVaccineData(country, date);
            const caseData = await getCases();
            const flag = await getFlag();
            addCard(country, date, vaccineData, caseData, flag);
            form.reset();
        } catch (er) {
            errorMessage.style.display = 'block';
            setTimeout(() => errorMessage.style.display = 'none', 2000);
        } 

    submitBtn.disabled = false;
        
    cardsContainer.removeChild(document.getElementById('loading'))
        
    });
};