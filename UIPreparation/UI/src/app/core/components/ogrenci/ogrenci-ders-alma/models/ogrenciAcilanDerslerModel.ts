class OgrenciAcilanDerslerDto {
    dersAcmaId: number;
    dersKodu: string;
    dersBolumu: string;
    dersAdi: string;
    zorunluSecmeli: string;
    kredi: number;
    ects: number;
    dersVerildigiSinif: string;
    ogrenciSinifi: string;
}

class AlinanDerslerDto {
    userId: number;
    dersDurum: number;
    dersAcmaIds: number[];
}