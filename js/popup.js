


window.onload = () => {
    const rusTextArea = document.getElementById('rusLetterArea')
    const engTextArea = document.getElementById('engLetterArea')
    let activeArea = null;
    
    const getConvertedLetter = (letters, flag) => {
        return new Promise(res => {
            const convertedLet = lettersValues.find(element => element[flag] === letters)
            if (convertedLet) {
                if (flag === 'eng') {
                    res(convertedLet.rus)
                } else if (flag === 'rus') {
                    res(convertedLet.eng)
                }
            }
            res(letters)
        })
    }

    const getCovertedArr = ({ value, language }) => {
        let convertedArr = [];
        return new Promise(async (res) => {
            for (let i = 0, length = value.length; i < length; i++) {
                const oldLetter = value[i].toLowerCase()
                const newLetter = await getConvertedLetter(oldLetter, language)
                convertedArr.push(newLetter)
            }
            res(convertedArr)
        })
    }

    const engToRus = async () => {
        const { value } = engTextArea
        if (value.length) {
            const convertedArr = await getCovertedArr({ value, language: 'eng' })
            const arrayToString = convertedArr.join('');
            rusTextArea.value = arrayToString
        }

    }

    const rusToEng = async () => {
        const { value } = rusTextArea;
        if (value.length) {
            const convertedArr = await getCovertedArr({ value, language: 'rus' })

            const arrayToString = convertedArr.join('');
            engTextArea.value = arrayToString
        }

    }

    const convert = (element) => {
        const language = element.target.getAttribute('data-language')

        if (language === 'rus') {
            rusToEng();
        } else if (language === 'eng') {
            engToRus();
        }
    }

    const addRusCopyHandler = () => {
        rusTextArea.onclick = function () {
            document.execCommand("copy");
        }

        rusTextArea.addEventListener("copy", function (event) {
            event.preventDefault();
            if (event.clipboardData) {
                event.clipboardData.setData("text/plain", rusTextArea.value);
            }
        });
    }

    const addEngCopyHandler = () => {
        engTextArea.onclick = function () {
            document.execCommand("copy");
        }

        engTextArea.addEventListener("copy", function (event) {
            event.preventDefault();
            if (event.clipboardData) {
                event.clipboardData.setData("text/plain", rusTextArea.value);
            }
        });
    }

    const enterEventListner = (event) =>{
        if (event.key === "Enter") {
            event.preventDefault();
            switch (activeArea) {
                case 'engLetterArea':
                    engToRus()
                    addRusCopyHandler()
                    break;
                case 'rusLetterArea':
                    rusToEng();
                    addEngCopyHandler();
                    break;
            }
        }
    }

    const textAreaClickHandler = () => {
        const textareas = document.querySelectorAll('textarea');
        for (textarea of textareas) {
            textarea.onclick = (elem) => enterEventHandler(elem)
        }
    }

    const enterEventHandler = (elem) => {
        activeArea = elem.target.name;

        document.removeEventListener("keydown", enterEventListner);
        document.addEventListener("keydown", enterEventListner);
    }

    const clickBtnHandler = () => {
        const btns = document.querySelectorAll('.convertsBtn');
        for (btn of btns) {
            btn.onclick = (elem) => convert(elem)
        }
    }

    const init = () => {
        clickBtnHandler()
        textAreaClickHandler();
    }

    init();
}