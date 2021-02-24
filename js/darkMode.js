/***************************************************************************/
/* SET VARIABLES */
/***************************************************************************/
const toggleButton = document.getElementById('toggleDarkMode');

/***************************************************************************/
/* SET THEME */
/***************************************************************************/
let setTheme = localStorage.getItem('themeMode');
setTheme = setTheme ? setTheme : 'lightTheme';

if (setTheme === 'darkTheme') {
  document.body.classList.toggle('darkTheme');
  toggleButton.innerHTML = `Modo Diurno`;
} else {
  document.body.classList.remove('darkTheme');
  toggleButton.innerHTML = `Modo Nocturno`;
}

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('darkTheme');
  if (setTheme === 'lightTheme') {
    setTheme = 'darkTheme';
    toggleButton.innerHTML = `Modo Diurno`;
  } else {
    setTheme = 'lightTheme';
    toggleButton.innerHTML = `Modo Nocturno`;
  }
  localStorage.setItem('themeMode', setTheme);
});
