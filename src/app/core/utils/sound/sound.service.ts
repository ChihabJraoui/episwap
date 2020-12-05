import { Injectable } from '@angular/core';

// *** Interface *** //
interface ISound {
  name: string;
  path: string;
}
@Injectable({
  providedIn: 'root'
})
export class SoundService {

  // *** Properties *** //
  private audio: any;

  private SOUND_PATH: any = {
    UI_TAP: '../../../assets/audios/ui_tap-variant-01.wav',
    UI_LOCK: '../../../assets/audios/ui_lock.wav',
    UI_UNLOCK: '../../../assets/audios/ui_unlock.wav',
    UI_STATE_CHANGE_UP: '../../../assets/audios/state-change_confirm-up.wav',
    UI_STATE_CHANGE_DOWN: '../../../assets/audios/state-change_confirm-down.wav',
    UI_ALERT: '../../../assets/audios/alert_error-02.wav',
    UI_SWIPE_LEFT: '../../../assets/audios/navigation_transition-left.wav',
    UI_SWIPE_RIGHT: '../../../assets/audios/navigation_transition-right.wav',
    UI_REFRESH: '../../../assets/audios/ui_refresh-feed.wav',
    UI_CELEBRATION: '../../../assets/audios/hero_simple-celebration-02.wav'
  };

  // *** Constructor *** //
  constructor() {
    this.audio = new Audio();
  }

  // *** Public Methods *** //
  testAudio() {
    console.log('testAudio');
    this.soundGeniric(this.SOUND_PATH.UI_LOCK);
  }

  lockSound(state: string) {

    console.log('state : ', state);
    if (state) {
      console.log('state is true');
      this.soundGeniric(this.SOUND_PATH.UI_LOCK);
    }

    if (!state) {
      console.log('state is false');
      this.soundGeniric(this.SOUND_PATH.UI_UNLOCK);
    }
  }

  swipeSound(state: string) {

    console.log('state : ', state);
    if (state) {
      console.log('state is true');
      this.soundGeniric(this.SOUND_PATH.UI_SWIPE_RIGHT);
    }

    if (!state) {
      console.log('state is false');
      this.soundGeniric(this.SOUND_PATH.UI_SWIPE_LEFT);
    }
  }

  stateChangeSound(state: string) {

    console.log('state : ', state);
    if (state) {
      console.log('state is true');
      this.soundGeniric(this.SOUND_PATH.UI_STATE_CHANGE_UP);
    }

    if (!state) {
      console.log('state is false');
      this.soundGeniric(this.SOUND_PATH.UI_STATE_CHANGE_DOWN);
    }
  }

  tapSound() {
    this.soundGeniric(this.SOUND_PATH.UI_TAP);
  }

  alertSound() {
    this.soundGeniric(this.SOUND_PATH.UI_ALERT);
  }

  celebrationSound() {
    this.soundGeniric(this.SOUND_PATH.UI_CELEBRATION);
  }

  RefreshSound() {
    this.soundGeniric(this.SOUND_PATH.UI_REFRESH);
  }

  // *** Private Methods *** //
  private soundGeniric(path: string) {
    this.audio.src = path;
    this.audio.load();
    this.audio.play();
  }

}
