document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('modeToggle');
    const folderUpload = document.getElementById('folderUpload');
    const pdfViewer = document.getElementById('pdfViewer');
    const audioPlayer = document.getElementById('audioPlayer');
    const pdfFileList = document.getElementById('pdfFileList');
    const mp3FileList = document.getElementById('mp3FileList');
    const searchInput = document.getElementById('search');

    function handleFiles(files) {
        const pdfFiles = [];
        const mp3Files = [];

        for (const file of files) {
            if (file.type === 'application/pdf') {
                pdfFiles.push(file);
            } else if (file.type === 'audio/mpeg') {
                mp3Files.push(file);
            }
        }

        // Clear existing lists
        pdfFileList.innerHTML = '';
        mp3FileList.innerHTML = '';

        // Add PDF files to the list
        pdfFiles.forEach(file => {
            const listItem = document.createElement('li');
            listItem.textContent = file.name;
            listItem.addEventListener('click', () => {
                const fileURL = URL.createObjectURL(file);
                pdfViewer.src = fileURL;
            });
            pdfFileList.appendChild(listItem);
        });

        // Add MP3 files to the list
        mp3Files.forEach(file => {
            const listItem = document.createElement('li');
            listItem.textContent = file.name;
            listItem.addEventListener('click', () => {
                const fileURL = URL.createObjectURL(file);
                audioPlayer.src = fileURL;
                audioPlayer.play();
            });
            mp3FileList.appendChild(listItem);
        });
    }

    function updateSearch() {
        const searchText = searchInput.value.toLowerCase();
        const pdfItems = pdfFileList.getElementsByTagName('li');
        const mp3Items = mp3FileList.getElementsByTagName('li');

        Array.from(pdfItems).forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(searchText) ? '' : 'none';
        });

        Array.from(mp3Items).forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(searchText) ? '' : 'none';
        });
    }

    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });

    folderUpload.addEventListener('change', (event) => {
        handleFiles(event.target.files);
    });

    searchInput.addEventListener('input', updateSearch);
});
