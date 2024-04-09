import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  userEmail: any;
  userResponse;
  portfolioList = [];
  constructor(public http: HttpClient) {}

  getUserDetails(user_email) {
    console.log(user_email);
    return this.http
      .get('http://localhost:3000/admin/user-details/' + user_email)
      .pipe(
        map((response: any) => {
          if (response.data) {
            this.userEmail = response.data.email;
            this.userResponse = response;
          }
          return response;
        })
      );
  }

  deleteUserDetails(user_email) {
    return this.http.delete(
      'http://localhost:3000/admin/user-details/' + user_email
    );
  }

  updateBasicDetails(basicDetailsObject) {
    basicDetailsObject = { ...basicDetailsObject, email: this.userEmail };
    console.log(basicDetailsObject);
    this.userResponse.data = {
      ...this.userResponse.data,
      ...basicDetailsObject,
    };
    return this.http.post<any>(
      'http://localhost:3000/admin/update-basic-details',
      basicDetailsObject
    );
  }

  updateEducation(educationObject) {
    educationObject = { ...educationObject, email: this.userEmail };
    this.userResponse.data.Education = educationObject.Education;
    console.log(educationObject);
    return this.http.post<any>(
      'http://localhost:3000/admin/update-education',
      educationObject
    );
  }

  updateExperience(experienceObject) {
    experienceObject = { ...experienceObject, email: this.userEmail };
    this.userResponse.data.Experiences = experienceObject.Experiences;
    return this.http.post<any>(
      'http://localhost:3000/admin/update-experiences',
      experienceObject
    );
  }

  updateLanguage(languageObject) {
    languageObject = { ...languageObject, email: this.userEmail };
    this.userResponse.data.Languages = languageObject.Languages;
    return this.http.post<any>(
      'http://localhost:3000/admin/update-languages',
      languageObject
    );
  }

  updateProject(projectObject) {
    projectObject = { ...projectObject, email: this.userEmail };
    this.userResponse.data.Projects = projectObject.Projects;
    return this.http.post<any>(
      'http://localhost:3000/admin/update-projects',
      projectObject
    );
  }

  updateSkill(SkillObject) {
    SkillObject = { ...SkillObject, email: this.userEmail };
    this.userResponse.data.Skills = SkillObject.Skills;
    return this.http.post<any>(
      'http://localhost:3000/admin/update-skills',
      SkillObject
    );
  }

  SOCIAL_CLASS_MAPPING = {
    Twitter: 'fab fa-twitter',
    LinkedIn: 'fab fa-linkedin-in',
    'Git hub': 'fab fa-github-alt',
    Youtube: 'fab fa-youtube',
    Facebook: 'fab fa-facebook',
  };
  updateSocialInfo(SocialInfoObject) {
    SocialInfoObject = { ...SocialInfoObject, email: this.userEmail };
    console.log(SocialInfoObject);
    SocialInfoObject.Socials.forEach((element) => {
      element.iconClass = this.SOCIAL_CLASS_MAPPING[element.name];
    });
    this.userResponse.data.Socials = SocialInfoObject.Socials;
    return this.http.post<any>(
      'http://localhost:3000/admin/update-social-info',
      SocialInfoObject
    );
  }

  getUserPortfolio() {
    return this.http.get('http://localhost:3000/admin/registered-emails');
  }

  deleteUserPortfolio() {
    console.log(this.portfolioList);
    return this.http.delete(
      'http://localhost:3000/admin/user-details/' + this.portfolioList
    );
  }
}
