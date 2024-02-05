import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-list-qrcodes',
  templateUrl: './list-qrcodes.component.html',
  styleUrls: ['./list-qrcodes.component.css']
})
export class ListQrcodesComponent implements OnInit {

  constructor(
    private router: Router,
    private headerService: HeaderService
  ) {
    headerService.headerData = {
      title: 'Gerar QR Code',
      icon: 'qr_code_scanner',
      routeUrl: '/qrcodes'
    }
  }

  ngOnInit(): void {
  }

  navigateToUserCreate(): void {
    this.router.navigate(['/qrcode/create'])
  }
}
