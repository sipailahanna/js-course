function buildForm (elementsData, formId) {
    const form = document.createElement("form");
    form.id = formId;
    form.setAttribute("action", "https://fe.it-academy.by/TestForm.php");
    elementsData.forEach(data => {
        const container = document.createElement("div");
        container.className = "container";
        const label = createLabel(data.label);
        const element = createWebElement(data);
        container.appendChild(label);
        container.appendChild(element);
        form.appendChild(container);
    });
    document.body.appendChild(form);
}

const map = {
    "longtext" : createLongText,
    "number": createNumber,
    "shorttext": createShortText,
    "dropdown": createDropdown,
    "radio": createRadio,
    "check": createCheckbox,
    "memo": createMemo,
    "submit": createSubmitButton
}

function createWebElement (elementData) {
    const createElement = map[elementData.kind];

    if (createElement) {
        return createElement(elementData);
    }

    throw new TypeError(`Error: Unsupported element type "${kind}". Please add it to the switch statement.`);
}

function createRadio (elementData) {
    const radioOptions = elementData.variants;
    const radioContainer = document.createElement("div");
    radioOptions.forEach(optionData => {
        const radioLabel = document.createElement("label");
        const radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", elementData.name); 
        radio.setAttribute("value", optionData.value);
        radioLabel.textContent = optionData.text;

        radioLabel.appendChild(radio);
        radioContainer.appendChild(radioLabel);
    })
    return radioContainer;
}

function createDropdown (elementData) {
        const dropdown = document.createElement("select");
        dropdown.setAttribute("name", elementData.name);
        const variants = elementData.variants;
        variants.forEach(variant => {
            const option = document.createElement("option");
            option.setAttribute("value", variant.value);
            option.textContent = variant.text;
            dropdown.appendChild(option);
        });
        return dropdown;
}

function createSubmitButton(elementData) {
    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("id", "myButton");
    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = elementData.caption;
    return submitBtn;
}

function createCheckbox(elementData) {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", elementData.name);
    return checkbox;
}

function createLongText(elementData) {
    const longText = document.createElement("textarea");
    longText.setAttribute("name", elementData.name);
    longText.setAttribute("rows", "1");
    longText.setAttribute("cols", "70");
    return longText;
}

function createNumber(elementData) {
    const number = document.createElement("input");
    number.setAttribute("type", "number");
    number.setAttribute("min", 0);
    number.setAttribute("name", elementData.name);
    return number;
}

function createShortText(elementData) {
    const shortText = element = document.createElement("input");
    shortText.setAttribute("type", "text");
    shortText.setAttribute("name", elementData.name);
    return shortText;
}

function createMemo(elementData) {
    const memo = document.createElement("textarea");
    memo.setAttribute("name", elementData.name);
    memo.setAttribute("rows", "5");
    memo.setAttribute("cols", "70");
    return memo;
}

function createLabel(labelText) {
    const label = document.createElement("label");
    label.textContent = labelText;
    label.className = "fixed-label";
    return label;
}