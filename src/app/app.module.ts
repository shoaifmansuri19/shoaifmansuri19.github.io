import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMaterialModule } from './angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ExperienceComponent } from './experience/experience.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SocialMediaComponent } from './social-media/social-media.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { ProjectsComponent } from './projects/projects.component';
import { CalendarModule } from 'primeng/calendar';
import { SkillsComponent } from './skills/skills.component';
import { EducationComponent } from './education/education.component';
import { LanguageComponent } from './language/language.component';
import { HttpClientModule } from '@angular/common/http';
import { TemplateComponent } from './template/template.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AccordionModule } from 'primeng/accordion';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SplitterModule } from 'primeng/splitter';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { EditBasicDetailsComponent } from './edit-basic-details/edit-basic-details.component';
import { EditProjectsComponent } from './edit-projects/edit-projects.component';
import { EditExperienceComponent } from './edit-experience/edit-experience.component';
import { EditSocialMediaComponent } from './edit-social-media/edit-social-media.component';
import { EditSkillsComponent } from './edit-skills/edit-skills.component';
import { EditEducationComponent } from './edit-education/edit-education.component';
import { EditLanguagesComponent } from './edit-languages/edit-languages.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TooltipModule } from 'primeng/tooltip';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DividerModule } from 'primeng/divider';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { ListboxModule } from 'primeng/listbox';
import { OrderListModule } from 'primeng/orderlist';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ExperienceComponent,
    SocialMediaComponent,
    BasicDetailsComponent,
    ProjectsComponent,
    SkillsComponent,
    EducationComponent,
    LanguageComponent,
    TemplateComponent,
    EditBasicDetailsComponent,
    EditProjectsComponent,
    EditExperienceComponent,
    EditSocialMediaComponent,
    EditSkillsComponent,
    EditEducationComponent,
    EditLanguagesComponent,
    EditContactComponent,
    AdminLoginComponent,
    PortfolioListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    HttpClientModule,
    FontAwesomeModule,
    ProgressSpinnerModule,
    AccordionModule,
    PanelMenuModule,
    SplitterModule,
    DynamicDialogModule,
    DialogModule,
    NgxSpinnerModule,
    NgxUiLoaderModule,
    DragDropModule,
    TooltipModule,
    DividerModule,
    ListboxModule,
    OrderListModule,
  ],
  providers: [
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
      TemplateComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
