document.getElementById('updateButton').addEventListener('click', updateEntry)
document.getElementById('deleteButton').addEventListener('click', deleteEntry)

async function updateEntry(info) {
    try {
        const response = await fetch('updateEntry', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: document.getElementsByName('name')[0].value,
                speciesName: document.getElementsByName('speciesName')[0].value,
                features:document.getElementsByName('features')[0].value ,
                homeWorld: document.getElementsByName('homeWorld')[0].value,
                image: document.getElementsByName('image')[0].value,
                interestingFacts: document.getElementsByName('interestingFacts')[0].value,
                noteableExamples: document.getElementsByName('noteableExamples')[0].value
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload
    } catch (err) {
        console.log(err)
    }
}

async function deleteEntry(info) {
        const input = document.getElementById('deleteInput')
        try {
            const response = await fetch('deleteEntry', {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: input.value
                })
            })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) { console.log(err) }
}