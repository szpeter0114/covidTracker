export const getVaccineData = async () => {
    const showVaccine = await fetchVaccine();
    return showVaccine;
 };

export const getCases = async () => {
    const showCases = await fetchMortality();
    return showCases;
};

export const getFlag = async () => {
    const showFlag = await fetchFlag();
    return showFlag;
};

const fetchVaccine = async () => {
    const date = document.querySelector('#date-input');
    const val = date.value;
    const [year, month, day] = val.split('-');
    const sliceYear = `${year.slice(2, 4)}`;
    const sliceDay = `${day < 10 ? day.slice(1, 2) : day}`;
    const dateOfQuery = `${month}/${sliceDay}/${sliceYear}`;

   const dataCont = document.querySelector('#data-container');
   const country = document.querySelector('#country');
  
   const numberOfVaccines = await fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country.value}`);
   const response = await numberOfVaccines.json();
   return new Promise((resolve, reject) => {
    if(response.status !== 200) {
        resolve(
            response.timeline[dateOfQuery]
        );
    } else {
        reject(dataCont.innerHTML = 'Something went wrong.');
    }
   }
    
)};

const fetchMortality = async () => {
    const date = document.querySelector('#date-input');
    const val = date.value;
    const [year, month, day] = val.split('-');
    const sliceYear = `${year.slice(2, 4)}`;
    const sliceDay = `${day < 10 ? day.slice(1, 2) : day}`;
    const dateOfQuery = `${month}/${sliceDay}/${sliceYear}`;

   const dataCont = document.querySelector('#data-container');
   const country = document.querySelector('#country');
  
   const mortality = await fetch(`https://disease.sh/v3/covid-19/historical/${country.value}`);
   const response = await mortality.json();
   return new Promise((resolve, reject) => {
    if(response.status !== 200) {
        resolve(
            response.timeline.deaths[dateOfQuery]
        );
    } else {
        reject(dataCont.innerHTML = 'Something went wrong.');
    }
   }   
)
};

const fetchFlag = async () => {
    
   const dataCont = document.querySelector('#data-container');
   const country = document.querySelector('#country');
  
   const flag = await fetch(`https://disease.sh/v3/covid-19/countries/${country.value}`);
   const response = await flag.json();
   return new Promise((resolve, reject) => {
    if(response.status !== 200) {
        resolve(
            response.countryInfo.flag
        );
    } else {
        reject(dataCont.innerHTML = 'Something went wrong.');
    }
   }   
)
};
