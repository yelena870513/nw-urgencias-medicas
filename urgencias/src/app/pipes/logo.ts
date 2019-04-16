import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'logo' })
export class LogoPipe implements PipeTransform {
    transform(value: string): any {
        switch (value){
            case 'Traumas':
                return 'assets/images/logo/logo-trau.png';
            case 'Shock':
                return 'assets/images/logo/logo-shock.png';
           case 'Reanimación cardiopulmonar':
                return 'assets/images/logo/logo-shock.png';
           case 'Urgencias Cardiovasculares':
                return 'assets/images/logo/logo-cardio.png';
           case 'Urgencias respiratorias':
                return 'assets/images/logo/logo-res.png';
           case 'Urgencias Neurológicas':
                return 'assets/images/logo/logo-neuro.png';
           case 'Urgencias digestivas':
                return 'assets/images/logo/logo-digest.png';
           case 'Urgencias Endocrino-Metabólicas':
                return 'assets/images/logo/logo-endo.png';
           case 'Desequilibrio Hidroelectrolítico':
                return 'assets/images/logo/logo-hidro.png';
           case 'Urgencias Nefro-Urológicas':
                return 'assets/images/logo/logo-nefro.png';
            case 'Urgencias Gineco-Obstétricas':
                return 'assets/images/logo/logo-gine.png';
            case 'Urgencias Psiquiátricas':
                return 'assets/images/logo/logo-psy.png';
            case 'Intoxicaciones Exógenas':
                return 'assets/images/logo/logo-into.png';
            case 'Urgencias Pediátricas':
                return 'assets/images/logo/logo-ped.png';
           case 'Otras urgencias':
                return 'assets/images/logo/logo-other.png';
           case 'Ecografía en urgencias':
                return 'assets/images/logo/logo-ultra.png';
            default:
                return 'assets/images/logo/logo-other.png';
        }
    }

}