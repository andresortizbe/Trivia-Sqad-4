var questions = 'https://opentdb.com/api.php?amount='
const categories = 'https://opentdb.com/api_category.php'
var questionsQuantity;

function getQuestions() {
    questionsQuantity = document.getElementById('questions-number').value
    console.log(document.getElementById('questions-number').value);
    questions = 'https://opentdb.com/api.php?amount' + questionsQuantity;
    console.log(questions);
}

function fetchcategorias() {
    // Se hace un fetch para imprimir las categorias y los tipos de preguntas
    fetch(categories)
        // Se transforma el archivo .json
        .then(function (response) {
            return response.json()
        })
        //   jsonData es la respuesta del servidor en formato json y se accede al objeto .categorias
        .then((jsonData) => {
            //  Se imprime los datos del servidor con la funcion printCategories
            printCategories(jsonData.trivia_categories)
            //  Se ejecuta la funcion para imprimir los tipos de preguntas
            printTypes()
        })
        //   En caso de no cargar la informacion produce un error
        .catch(() => {
            alert('Error al Contactar Con Server')
        })
}


function fetchquestions() {
    // Se hace un fetch para cargar las preguntas del api

    fetch(questions)
        // Se transforma el archivo .json
        .then(function (response) {
            return response.json()
        })
        .then((jsonData) => {
            // jsonData es la respuesta del servidor en formato json y se accede a los resultados
            printQuestions(jsonData.results)
            // console.log(jsonData.results)
        })
        .catch(() => {
            alert('Tuvimos un error del servidor de la api')
        })
}


//  fucion para imprimir los datos  de las categorias
function printCategories(categories) {
    //    Se captura donde se va a imprimir las categorias
    const tCategoria = document.getElementById('t-categorias')
    // Se genera el codigo en HTML en cada array con un map y se define en la constante "html"
    const htmlCate = categories.map(function (category) {
        return `<option value="${category.id}">${category.name}</option>`
    })
    //se imprime el resultado del map en tableBody
    const htmlCateJoined = htmlCate.join("")
    tCategoria.innerHTML = htmlCateJoined
}


//  fucion para imprimir los datos  de los tipos de preguntas
function printTypes() {
    //    Se captura donde se va a imprimir los tipos
    const tTypes = document.getElementById('t-type')
    // Se genera el codigo en HTML y se define en una constante
    const htmlType = `
            <option value="taleatoria">Aleatoria</option>
            <option value="tboolean">True / False</option>
            <option value="tmultiple">Multiple choise</option>
            `
    //  se imprime la constante en tTypes
    tTypes.innerHTML = htmlType
}


//  funcion display de las preguntas
function printQuestions(preguntas) {
    //  Se captura donde se va a imprimir las preguntas
    const tQuestions = document.getElementById('t-preguntas')
    //  Se crea la variable temp para utilizar un numero de conteo en el atributo name
    let temp = 0
    //  Se genera el codigo en HTML en cada array con un map y se define en la constante "htmlquestions"
    const htmlQuestions = preguntas.map(function (pregunta) {
        //  en el caso de que el tipo de pregunta sea boolean            
        if (pregunta.type === "boolean") {
            //  Se suma 1 al valor de temp para obtener un numero diferente en cada array
            temp += 1
            return `
                
                <label>Question ${pregunta.type} of ${pregunta.category}:<br><b> ${pregunta.question}</b></label>
                <p>Answer: 
                    <br>
                    <label><input type="radio" name="respuesta${temp}" value="true" /> ${pregunta.correct_answer} </label>
                    <br>
                    <label><input type="radio" name="respuesta${temp}" value="false" /> ${pregunta.incorrect_answers} </label>
                </p>
                `
        }
        //  en el caso de que el tipo de pregunta sea multiple
        else if (pregunta.type === "multiple") {
            //  Se suma 1 al valor de temp para obtener un numero diferente a los ya utilizados en cada array
            temp += 1
            return `                
                <label>Question ${pregunta.type} of ${pregunta.category}:<br><b> ${pregunta.question}</b></label>
                <p>Answer: 
                    <br>
                    <label><input type="radio" name="respuesta${temp}" value="false" /> ${pregunta.incorrect_answers[1]} </label>
                    <br>
                    <label><input type="radio" name="respuesta${temp}" value="true" /> ${pregunta.correct_answer} </label>
                    <br>
                    <label><input type="radio" name="respuesta${temp}" value="false" /> ${pregunta.incorrect_answers[0]} </label>
                    <br>
                    <label><input type="radio" name="respuesta${temp}" value="false" /> ${pregunta.incorrect_answers[2]} </label>
                </p>
                `
        }
    })
    //  se imprime el resultado del map en tableBody
    const htmlQuestionsJoined = htmlQuestions.join("")
    tQuestions.innerHTML = htmlQuestionsJoined


}


function selecfun() {
    //  se modifica url segun peticiones de usuarios
    let selecate = document.getElementById('t-categorias')
    let selecate2 = selecate.value
    let codigocate = 'https://opentdb.com/api.php?amount=' + questionsQuantity + '&category=' + selecate2;

    //  se obtiene el valor seleccionado en el filtro del html para el tipo de pregunta

    let selectype = document.getElementById('t-type')
    let selectype2 = selectype.value

    //  si el valor elegido es bolean, la url de la api sera para preguntas de tipo boolean
    if (selectype2 === "tboolean") {
        questions = codigocate + '&type=boolean'

        fetchquestions()

    }


    //  si el valor elegido es multiple, la url de la api sera para preguntas de tipo multiple
    else if (selectype2 === "tmultiple") {
        questions = codigocate + '&type=multiple'

        fetchquestions()

    }
    //  si el valor elegido es aleatorio, la url de la api sera para preguntas de ambos tipos aleatoriamente
    else if (selectype2 === "taleatoria") {
        questions = codigocate + ''

        fetchquestions()

    }

}


function buttonrr() {

    let respchecked = false
    let respvalue = 0
    let sumaresult = 0
    let resultado = []
    let tresults = document.getElementById('t-resultados')

    for (let s = 1; s < 11; s++) {

        resultado = document.getElementsByName('respuesta' + s)

        for (let i = 0; i < resultado.length; i++) {
            respchecked = resultado[i].checked
            respvalue = resultado[i].value

            if (respchecked == true && respvalue == "true") {
                sumaresult += 1
            }
            else {

            }
        }
    }

    tresults.innerHTML = `
        <h3>Estos son los resultados:</h3><br>
        <h3>Tiene ${sumaresult} respuestas correctas</h3><br>
        <h3>Tiene ${10 - sumaresult} respuestas incorrectas</h3><br>
        `
}

fetchcategorias()
fetchquestions()

window.selecfun = selecfun
window.buttonrr = buttonrr

