function finder() {
    const commandsInput = document.getElementById('commands').value;
    const commands = commandsInput.split(',').map(cmd => cmd.trim());
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '';
    const dataSources = {
        posts: posts,
        comments: comments,
        albums: albums,
        photos: photos,
        todos: todos,
        users: users
    };

    commands.forEach(command => {
        if (!command.includes(':')) {
            resultDiv.innerHTML += `<h3>Invalid command format: "${command}"</h3>`;
            return;
        }

        const [numberAndElement, dataSource] = command.split(':');
        const [numElements] = numberAndElement.split('-').map(e => e.trim());
        const trimmedDataSource = dataSource.trim();
        const dataSourceArray = dataSources[trimmedDataSource];

        if (!dataSourceArray) {
            resultDiv.innerHTML += `<h3>Data source "${trimmedDataSource}" not found</h3>`;
            return;
        }

        const groupedElements = dataSourceArray.slice(0, parseInt(numElements));

        let resultString = `<h3>Grouped Elements for "${trimmedDataSource} (${numElements})":</h3>`;
        if (groupedElements.length > 0) {
            const ul = document.createElement('ul');
            groupedElements.forEach(element => {
                const li = document.createElement('li');
                if (element.title) {
                    li.innerHTML = `<strong>${element.title}</strong><br>${element.body}`;
                } else {
                    li.innerHTML = `<strong>${element.name}</strong><br>${element.body}`;
                }
                ul.appendChild(li);
            });
            resultString += ul.outerHTML;
        } else {
            resultString += '<p>No elements found or incorrect input.</p>';
        }

        resultDiv.innerHTML += resultString;
    });
}
