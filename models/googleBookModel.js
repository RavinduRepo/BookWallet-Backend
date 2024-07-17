class Book {
    constructor(data) {
        this.kind = data.kind || '';
        this.id = data.id || '';
        this.etag = data.etag || '';
        this.selfLink = data.selfLink || '';
        this.volumeInfo = {
            title: data.volumeInfo.title || '',
            authors: data.volumeInfo.authors || [],
            publisher: data.volumeInfo.publisher || '',
            publishedDate: data.volumeInfo.publishedDate || '',
            description: data.volumeInfo.description || '',
            industryIdentifiers: data.volumeInfo.industryIdentifiers || [],
            readingModes: {
                text: data.volumeInfo.readingModes ? data.volumeInfo.readingModes.text : false,
                image: data.volumeInfo.readingModes ? data.volumeInfo.readingModes.image : false
            },
            pageCount: data.volumeInfo.pageCount || 0,
            printType: data.volumeInfo.printType || '',
            categories: data.volumeInfo.categories || [],
            maturityRating: data.volumeInfo.maturityRating || '',
            allowAnonLogging: data.volumeInfo.allowAnonLogging || false,
            contentVersion: data.volumeInfo.contentVersion || '',
            panelizationSummary: {
                containsEpubBubbles: data.volumeInfo.panelizationSummary ? data.volumeInfo.panelizationSummary.containsEpubBubbles : false,
                containsImageBubbles: data.volumeInfo.panelizationSummary ? data.volumeInfo.panelizationSummary.containsImageBubbles : false
            },
            imageLinks: {
                smallThumbnail: data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.smallThumbnail : '',
                thumbnail: data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : ''
            },
            language: data.volumeInfo.language || '',
            previewLink: data.volumeInfo.previewLink || '',
            infoLink: data.volumeInfo.infoLink || '',
            canonicalVolumeLink: data.volumeInfo.canonicalVolumeLink || ''
        };
        this.saleInfo = {
            country: data.saleInfo.country || '',
            saleability: data.saleInfo.saleability || '',
            isEbook: data.saleInfo.isEbook || false
        };
        this.accessInfo = {
            country: data.accessInfo.country || '',
            viewability: data.accessInfo.viewability || '',
            embeddable: data.accessInfo.embeddable || false,
            publicDomain: data.accessInfo.publicDomain || false,
            textToSpeechPermission: data.accessInfo.textToSpeechPermission || '',
            epub: {
                isAvailable: data.accessInfo.epub ? data.accessInfo.epub.isAvailable : false
            },
            pdf: {
                isAvailable: data.accessInfo.pdf ? data.accessInfo.pdf.isAvailable : false
            },
            webReaderLink: data.accessInfo.webReaderLink || '',
            accessViewStatus: data.accessInfo.accessViewStatus || '',
            quoteSharingAllowed: data.accessInfo.quoteSharingAllowed || false
        };
        this.searchInfo = {
            textSnippet: data.searchInfo ? data.searchInfo.textSnippet : ''
        };
    }
}

module.exports = Book;