import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character/character.service';
import { ReplaySubject } from 'rxjs';
import { CharacterAttributes } from '@model/character.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-my-character',
  templateUrl: './my-character.component.html',
  styleUrls: ['./my-character.component.css']
})
export class MyCharacterComponent implements OnInit {
  character = new ReplaySubject<CharacterAttributes>(1);

  constructor(private characterService: CharacterService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUser$()
      .subscribe((user) =>
        this.characterService
          .getAllAttributesForUser(user.id)
          .subscribe((attributes) => this.character.next(attributes))
      );
  }
}
