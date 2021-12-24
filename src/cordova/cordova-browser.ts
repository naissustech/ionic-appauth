import { CordovaDocument } from './cordova-document';
import { Browser } from '../auth-browser'
import { SafariViewController } from '@ionic-native/safari-view-controller'
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser'

// REQUIRES CORDOVA PLUGINS
// cordova-plugin-safariviewcontroller
// cordova-plugin-customurlscheme
// cordova-plugin-inappbrowser FROM https://github.com/Onegini/cordova-plugin-inappbrowser.git
export class CordovaBrowser extends Browser {

    private inAppBrowserRef : InAppBrowserObject | undefined;

    public async  closeWindow(): Promise<void> {
        await CordovaDocument.ready();
            if(this.inAppBrowserRef != undefined)
                this.inAppBrowserRef.close(); 
    }

    public async showWindow(url: string) : Promise<string | undefined> {
        await CordovaDocument.ready();
            let options: any = {
                location: 'no',
                zoom: 'no',
                clearcache: 'yes',
                clearsessioncache: 'yes',     
            }
            this.inAppBrowserRef = InAppBrowser.create(url, '_self', options);
            if(this.inAppBrowserRef != undefined)
                this.inAppBrowserRef.on('exit').subscribe(() => this.onCloseFunction());       
        return;
    }
        
       
}
