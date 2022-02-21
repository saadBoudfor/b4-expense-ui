import {Component, OnInit} from '@angular/core';
import {StorageRepository} from "../../../repositories/storage-repository.service";
import {Storage} from "../../../data-models/Storage";
import {Bucket} from "../../../data-models/Bucket";
import {NGXLogger} from "ngx-logger";
import {ConfirmationService} from "../../../../b4-common/services/confirmation.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StorageService} from "../../../services/storage.service";

@Component({
  selector: 'new-storage',
  templateUrl: './new-storage.component.html',
  styleUrls: ['./new-storage.component.scss']
})
export class NewStorageComponent implements OnInit {


  storage = new Storage();
  isStorageValid = false;
  isNameAlreadyUsed = false;

  constructor(private storageRepository: StorageRepository,
              private storageService: StorageService,
              private snackbar: MatSnackBar,
              private confirmationService: ConfirmationService,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.storage.buckets = [new Bucket()];
  }

  checkStorage() {
    this.storageService.check(this.storage).subscribe(response => {
      this.isStorageValid = response.valid;
      this.isNameAlreadyUsed = response.usedName;
    });
  }

  save() {
    this.logger.info('save new storage space named: ' + this.storage.name, {storage: this.storage});
    this.storageRepository.save(this.storage).subscribe(saved => {
      if (!!saved.id) {
        this.storageService.updateSelectedStorageId(saved.id);
      }
      this.logger.info('storage ' + this.storage.name + ' saved success with id: ', saved.id);
      this.confirmationService.open({
        message: "L'espace de stockage " + saved.name + " à été crée avec succès avec l'id: " + saved.id,
        steps: 0,
        page: '/storage',
        active: 0,
        success: true,
        title: 'Espace de stockage crée avec succès',
        backButton: 'ajouter des produits'
      })
    }, error => {
      this.logger.error('failed to save storage', {error});
      this.snackbar.open("Une erreur s'est produit lors de la création de l'espace de stockage");
    })
  }


}
