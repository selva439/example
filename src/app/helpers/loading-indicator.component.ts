import {Component} from '@angular/core';

@Component({
    selector: 'loading-indicator',
    template: `<div style="display:flex;justify-content:center;margin:auto 0"><p><i class="fa fa-spinner fa-spin" style="font-size:60px;color:dodgerblue;"></i><br><div>Loading </div></p></div>`
})
export class LoadingPage {
    public loading: boolean;
    standby() {
        this.loading = true;
    }
    ready() {
        this.loading = false;
    }
}