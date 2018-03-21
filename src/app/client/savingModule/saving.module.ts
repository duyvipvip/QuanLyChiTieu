import { SharedModule } from './../sharedModule/shared.module';
import { PageSavingComponent } from './pagesaving/pagesaving.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DetailsavingComponent } from './pagesaving/detailsaving/detailsaving.component';
import { ListsavingComponent } from './pagesaving/listsaving/listsaving.component';
import { AddsavingComponent } from './pagesaving/addsaving/addsaving.component';
import { EditsavingComponent } from './pagesaving/editsaving/editsaving.component';
import { ChooseImageComponent } from './pagesaving/addsaving/choose-image/choose-image.component';
import { SendInComponent } from './pagesaving/detailsaving/send-in/send-in.component';
import { EditSavingComponent } from './pagesaving/detailsaving/edit-saving/edit-saving.component';
import { SendOutComponent } from './pagesaving/detailsaving/send-out/send-out.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
               path: '', component: PageSavingComponent , children: [
                    { path: '', component: ListsavingComponent },
                    { path: ':idsaving', component: DetailsavingComponent },
               ]
           },
       ])
    ],
    exports: [
        PageSavingComponent,
        ListsavingComponent,
        DetailsavingComponent,
        AddsavingComponent,
        EditsavingComponent,
        ChooseImageComponent
    ],
    declarations: [
        PageSavingComponent,
        ListsavingComponent,
        DetailsavingComponent,
        AddsavingComponent,
        EditsavingComponent,
        ChooseImageComponent,
        SendInComponent,
        EditSavingComponent,
        SendOutComponent,
    ],
    providers: [],
})
export class SavingModule { }
