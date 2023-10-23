//Class
class LoadPicture {
    constructor(options) {
        this.Url = 'https://jsonplaceholder.typicode.com/photos';
        this.area = document.querySelector(options.area) || document.body;
        this.numberPhoto = options.numberPhoto || 10;
        this.order = options.order || 'ASC';
        this.loadingIcon = document.getElementById('loading-icon');
        this.photos = [];
        this.currentBatch = 0;

        //pour obtenir de bouton de html
        this.prevButton = document.getElementById('prev-button');
        this.nextButton = document.getElementById('next-button');

        this.prevButton.addEventListener('click', this.showPreviousBatch.bind(this));
        this.nextButton.addEventListener('click', this.showNextBatch.bind(this));

        this.load();
    }

    //Fetch url et LoadingIcon
    async load() {
        this.showLoadingIcon();
        try {
            const response = await fetch(this.Url);
            if (!response.ok) {
                throw new Error('Erreur');
            }
            const data = await response.json();
            this.photos = data;
            this.displayPhotos();
        } catch (error) {
            console.error(error);
        } finally {
            this.hideLoadingIcon();
        }
    }

    showLoadingIcon() {
        this.loadingIcon.style.display = 'block';
    }

    hideLoadingIcon() {
        this.loadingIcon.style.display  = 'none';
    }

    // logic de display photos
    displayPhotos() {
        const startIndex = this.currentBatch * this.numberPhoto;
        const endIndex = startIndex + this.numberPhoto;
        const batch = this.photos.slice(startIndex, endIndex);

        // montre  les photos dans le Dom
        const photosContainer = document.querySelector('.photos');
         // vide le conteneur
        photosContainer.innerHTML = '';

        // parourir le photo dans le lot
        batch.forEach((photo) => {
            const img = document.createElement('img');
            img.src = photo.url;
            img.alt = photo.title;
            photosContainer.appendChild(img);
        });
    }

    // lot the photo suivan
    showNextBatch() {
        this.currentBatch++;
        this.displayPhotos();
    }
// lot the photo precedent
    showPreviousBatch() {
        if (this.currentBatch > 0) {
            this.currentBatch--;
            this.displayPhotos();
        }
    }
}

const pictures = new LoadPicture({
    area: '.photo-gallery',
});
