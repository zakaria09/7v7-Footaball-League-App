import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTooltipModule
  } from '@angular/material';

@NgModule({
    imports: [
        MatInputModule,
        MatFormFieldModule, 
        MatButtonModule, 
        MatIconModule, 
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatTableModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatTooltipModule
    ],
    exports: [
        MatInputModule, 
        MatFormFieldModule, 
        MatButtonModule, 
        MatIconModule, 
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatTableModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatTooltipModule
    ]
})

export class MaterialModule{}