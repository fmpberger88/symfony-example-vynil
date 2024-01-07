import { Controller } from '@hotwired/stimulus';
import axios from "axios";
export default class extends Controller {
    static values = {
        infoUrl: String
    }

    play(event) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        if (!this.infoUrlValue) {
            console.log("No URL found");
            return;
        }

        axios.get(this.infoUrlValue)
            .then((response) => {
                if (!response || !response.data || !response.data.url) {
                    console.log("Invalid response data")
                    return;
                }

                const audio = new Audio(response.data.url);
                if (audio && audio.play) {
                    audio.play();
                } else {
                    console.log("Can't play audio. Audio object: ", audio);
                }
            })
            .catch((err) => {
                console.error("Error during HTTP request: ", err);
            });
    }
}
