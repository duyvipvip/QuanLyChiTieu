import { RouterModule } from '@angular/router';
import { SharedModule } from './../sharedModule/shared.module';
import { NgModule } from '@angular/core';
import { PageReportComponent } from './pagereport/pagereport.component';
import { ReportDetailComponent } from './pagereport/report-detail/report-detail.component';
import { ReportComponent1 } from './pagereport/report/report.component';
import { ChooseWalletReportComponent } from './pagereport/choose-wallet-report/choose-wallet-report.component';
import { ChooseDateReportComponent } from './pagereport/choose-date-report/choose-date-report.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([{
            path: '', component: PageReportComponent,  children: [
                { path: '', component: ReportComponent1 },
                { path: 'detail', component: ReportDetailComponent },
            ]
            }
        ])
    ],
    exports: [],
    declarations: [PageReportComponent, ReportDetailComponent, ReportComponent1, ChooseWalletReportComponent, ChooseDateReportComponent],
    providers: [],
})
export class ReportModule { }
