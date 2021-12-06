import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config/config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  version: string;

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.configService.getVersion().subscribe((version) => (this.version = version.version));
  }

  openGithub(): void {
    window.open('https://github.com/cbartel/nw-company-tool', '_blank');
  }
}
