import { Injectable, Input, Output, EventEmitter } from '@angular/core';

@Injectable()
export class ProfileService {

  @Output() experienceCount: EventEmitter<any> = new EventEmitter();
  @Output() skillCount: EventEmitter<any> = new EventEmitter();

  constructor() { }

  public setExperienceCount(count) {
    this.experienceCount.emit(count);
  }

  public getExperienceCount() {
    return this.experienceCount;
  }

  public setSkillCount(count) {
    this.skillCount.emit(count);
  }

  public getSkillCount() {
    return this.skillCount;
  }

}
