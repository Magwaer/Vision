#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sqlalchemy as sqla
from sqlalchemy_i18n import (
    make_translatable
, translation_base
, Translatable
)
from app import db
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base

BaseManager = declarative_base()


class Lab(BaseManager):
    __tablename__ = 'lab'

    id = sqla.Column(sqla.Integer, primary_key=True)
    code = sqla.Column(db.Integer)
    analyser = sqla.Column(sqla.Unicode(256))

    def __init__(self, code=0, analyser=''):
        self.code = code
        self.analyser = analyser

    def dump(self, _indent=0):
        return "   " * _indent + repr(self) + \
               "\n" + \
               "".join(
                   [c.dump(_indent + 1) for c in self.children.values()]
               )

    def __repr__(self):
        return "Lab(id=%r, code=%r, analyser=%r)" % (
            self.id,
            self.code,
            self.analyser
        )


class ElectricalProfile(BaseManager):
    __tablename__ = 'electrical_profile'

    id = sqla.Column(sqla.Integer, primary_key=True)

    selection = sqla.Column(sqla.Unicode(256))
    description = sqla.Column(sqla.Unicode(1024))
    bushing = sqla.Column(sqla.Boolean(False))
    winding = sqla.Column(sqla.Boolean(False))
    winding_double = sqla.Column(sqla.Boolean(False))
    insulation = sqla.Column(sqla.Boolean(False))
    visual = sqla.Column(sqla.Boolean(False))
    resistance = sqla.Column(sqla.Boolean(False))
    degree = sqla.Column(sqla.Boolean(False))
    turns = sqla.Column(sqla.Boolean(False))

    def dump(self, _indent=0):
        return "   " * _indent + repr(self) + \
               "\n" + \
               "".join(
                   [c.dump(_indent + 1) for c in self.children.values()]
               )

    def parsedata(self, data):
        if data:
            for key in data.keys():
                # print key + ' ' + data[key]
                if hasattr(self, key):
                    if key == 'selection' or key == 'description':
                        if data[key]:
                            setattr(self, key, data[key])
                    else:
                        setattr(self, key, True if data[key] == 'y' else False)

    def __init__(self, data=None):
        self.parsedata(data)
        # print getattr(self, key)

    def clear_data(self):
        for attr in self.__dict__:
            if attr not in ['id', '_sa_instance_state']:
                # print attr
                if attr == 'selection' or attr == 'description':
                    setattr(self, attr, '')
                else:
                    setattr(self, attr, False)

    def add_data(self, data):
        self.parsedata(data)



class FluidProfile(BaseManager):
    __tablename__ = 'fluid_profile'

    id = sqla.Column(sqla.Integer, primary_key=True)

    selection = sqla.Column(sqla.Unicode(256))
    description = sqla.Column(sqla.Unicode(1024))

    # syringe
    gas = sqla.Column(sqla.Boolean(False))
    water = sqla.Column(sqla.Boolean(False))
    furans = sqla.Column(sqla.Boolean(False))
    inhibitor = sqla.Column(sqla.Boolean(False))
    pcb = sqla.Column(sqla.Boolean(False))
    qty = sqla.Column(sqla.Integer)
    sampling = sqla.Column(sqla.Integer)
    # jar
    dielec = sqla.Column(sqla.Boolean(False))
    acidity = sqla.Column(sqla.Boolean(False))
    density = sqla.Column(sqla.Boolean(False))
    pcb_jar = sqla.Column(sqla.Boolean(False))
    inhibitor_jar = sqla.Column(sqla.Boolean(False))
    point = sqla.Column(sqla.Boolean(False))
    dielec_2 = sqla.Column(sqla.Boolean(False))
    color = sqla.Column(sqla.Boolean(False))
    pf = sqla.Column(sqla.Boolean(False))
    particles = sqla.Column(sqla.Boolean(False))
    metals = sqla.Column(sqla.Boolean(False))
    viscosity = sqla.Column(sqla.Boolean(False))
    dielec_d = sqla.Column(sqla.Boolean(False))
    ift = sqla.Column(sqla.Boolean(False))
    pf_100 = sqla.Column(sqla.Boolean(False))
    furans_f = sqla.Column(sqla.Boolean(False))
    water_w = sqla.Column(sqla.Boolean(False))
    corr = sqla.Column(sqla.Boolean(False))
    dielec_i = sqla.Column(sqla.Boolean(False))
    visual = sqla.Column(sqla.Boolean(False))
    qty_jar = sqla.Column(sqla.Integer)
    sampling_jar = sqla.Column(sqla.Integer)
    # vial
    pcb_vial = sqla.Column(sqla.Boolean(False))
    antioxidant = sqla.Column(sqla.Boolean(False))
    qty_vial = sqla.Column(sqla.Integer)
    sampling_vial = sqla.Column(sqla.Integer)

    def parsedata(self, data):
        if data:
            for key in data.keys():
                if hasattr(self, key):
                    if key in ['selection', 'description', 'qty', 'sampling', 'qty_jar', 'sampling_jar', 'qty_vial',
                               'sampling_vial', 'sampling_vial']:
                        if data[key]:
                            setattr(self, key, data[key])
                    else:
                        setattr(self, key, True if data[key] == 'y' else False)

    def __init__(self, data=None):
        self.parsedata(data)

    def clear_data(self):
        for attr in self.__dict__:
            if attr not in ['id', '_sa_instance_state']:
                # print attr
                if attr == 'selection' and attr == 'description':
                    setattr(self, attr, '')
                if attr in ['qty', 'sampling', 'qty_jar', 'sampling_jar', 'qty_vial', 'sampling_vial', 'sampling_vial']:
                    setattr(self, attr, 0)
                else:
                    setattr(self, attr, False)

    def add_data(self, data):
        self.parsedata(data)


class Location(BaseManager):
    # PhyPosition GPS location
    __tablename__ = u'location'

    id = sqla.Column(db.Integer(), primary_key=True, nullable=False)
    # Site. What is the name of the site.
    # Example. A company may have a assembly plants in several cities,
    # therefore each site is named after each city where the plant is.
    Name = sqla.Column(db.String(50), index=True)  # should be relation


class Manufacturer(BaseManager):
    __tablename__ = u'manufacturer'

    id = sqla.Column(db.Integer(), primary_key=True, nullable=False)
    Name = sqla.Column(db.String(50))


class Norms(BaseManager):
    __tablename__ = u'norms'

    id = sqla.Column(db.Integer(), primary_key=True, nullable=False)
    Name = sqla.Column(db.String(50), index=True)  # should be relation


    # NormPHY.  Fluid physical properties norms
    # NormDissolvedGas. Fluid dissolved gas norms
    # NormFluid# NormFur. Fluid furan norms


class GasSensor(BaseManager):
    """
    GasSensor. List gas sensor with their respective sensitivity to each measured gas
     """
    __tablename__ = u'gas_sensor'

    id = sqla.Column(db.String(25), primary_key=True)

    # Sensor. Sensor commercial name
    Name = sqla.Column(db.String(50))
    Serial = sqla.Column(db.String(50), primary_key=True, nullable=False, index=True)

    Manufacturer = db.Column(
        'manufacturer_id',
        db.ForeignKey("manufacturer.id"),
        nullable=False
    )

    H2 = sqla.Column(db.Float(53), server_default=db.text("0"))  # Remaining are equivalent
    CH4 = sqla.Column(db.Float(53), server_default=db.text("0"))
    C2H2 = sqla.Column(db.Float(53), server_default=db.text("0"))
    C2H4 = sqla.Column(db.Float(53), server_default=db.text("0"))
    C2H6 = sqla.Column(db.Float(53), server_default=db.text("0"))
    CO = sqla.Column(db.Float(53), server_default=db.text("0"))
    CO2 = sqla.Column(db.Float(53), server_default=db.text("0"))
    O2 = sqla.Column(db.Float(53), server_default=db.text("0"))
    N2 = sqla.Column(db.Float(53), server_default=db.text("0"))

    # ppmError. Calculated ppm error by comparing lab ppm from sample with sensor reading at sampling time
    ppmError = sqla.Column(db.Integer, server_default=db.text("0"))

    # percentError. Calculated error in percent
    percentError = sqla.Column(db.Float(53), server_default=db.text("0"))

    def __repr__(self):
        return "G"


class Transformer(BaseManager):
    __tablename__ = u'transformer'

    id = sqla.Column(db.Integer(), primary_key=True, nullable=False)

    # Assigned name given by production.
    # Production name never change but equipment may moved around. Must be careful applying a diagnostic related to a
    # Production because equipment can changed over the years and associate wrong diagnostic
    Name = sqla.Column(db.String(50))

    # EquipmentSerialNum: Equipment ID given by manufacturer.
    # Index key, along with Equipment number to uniquely identify equipment
    Serial = sqla.Column(db.String(50), primary_key=True, nullable=False, index=True)

    Manufacturer = db.Column(
        'manufacturer_id',
        db.ForeignKey("manufacturer.id"),
        nullable=False
    )

    GasSensor = db.Column(
        'gas_sensor_id',
        db.ForeignKey("gas_sensor.id"),
        nullable=False
    )

    Frequency = sqla.Column(db.Integer)  # Frequency. Operating frequency
    Windings = sqla.Column(db.Integer)  # Windings. Number of windings in transformer
    Sealed = sqla.Column(db.Boolean)  # Sealed. Is equipment sealed.
    PhaseNumber = sqla.Column(db.Boolean)  # PhaseNum. 1=single phase, 3=triphase, 6=hexaphase

    # FluidVolume. Quantity of insulating fluid in equipment in litre
    FluidVolume = sqla.Column(db.Float(53))

    Description = sqla.Column(db.String(50))  # Description. Describe the equipment function

    # WeldedCover. Is cover welded. Important to planned work as it is much longer to remove cover
    WeldedCover = sqla.Column(db.Boolean)

    PrimaryTension = sqla.Column(db.Float(53))  # Volt1. Primary voltage in kV
    SecondaryTension = sqla.Column(db.Float(53))  # Volt2. Secondary voltage in kV
    TertiaryTension = sqla.Column(db.Float(53))  # Volt3. Tertiary voltage in kV

    BasedTransformerPower = sqla.Column(db.Float(53))  # MVA1. Based transformer power
    FirstCoolingStagePower = sqla.Column(db.Float(53))  # MVA2. First cooling stage power
    SecondCoolingStagePower = sqla.Column(db.Float(53))  # MVA3. second cooling stage power

    AutoTransformer = sqla.Column(db.Boolean)  # Autotransformer. True if it is

    # is a separate device
    PrimaryWindingConnection = sqla.Column(
        db.Integer)  # PrimConnection. Primary windings connection on a multi phase transformer
    SecondaryWindingConnection = sqla.Column(
        db.Integer)  # SecConnection. Secondary windings connection on a multi phase transformer
    TertiaryWindingConnection = sqla.Column(
        db.Integer)  # TertConnection. Tertiary windings connection on a multi phase transformer

    # winding metal is a property of winding
    WindindMetal = sqla.Column(db.Integer)  # WindingMetal. Copper or aluminium

    BIL1 = sqla.Column(db.Float(53))  # BIL1. Primary Insulation level in kV
    BIL2 = sqla.Column(db.Float(53))  # BIL2. Secondary Insulation level in kV
    BIL3 = sqla.Column(db.Float(53))  # BIL3. Tertiary Insulation level in kV

    StaticShield1 = sqla.Column(db.Boolean)  # StaticShield1. true with primary electrostatic shield is present
    StaticShield2 = sqla.Column(db.Boolean)  # StaticShield2. true with secondary electrostatic shield is present
    StaticShield3 = sqla.Column(db.Boolean)  # StaticShield3. true with tertiary electrostatic shield is present

    # it's tranformer property
    BushingNeutral1 = sqla.Column(db.Float(53))
    BushingNeutral2 = sqla.Column(db.Float(53))
    BushingNeutral3 = sqla.Column(db.Float(53))
    BushingNeutral4 = sqla.Column(db.Float(53))

    LTC1 = sqla.Column(db.Float(53))  # LTC1.
    LTC2 = sqla.Column(db.Float(53))  # LTC2
    LTC3 = sqla.Column(db.Float(53))  # LTC3

    TemperatureRise = sqla.Column(db.Integer)  # TemperatureRise. Transformer temperature rise

    # it can be a property and also can be tested
    Impedance1 = sqla.Column(db.Float(53))  # Impedance1. Impedance at base MVA
    Imp_Base1 = sqla.Column(db.Float(53))  # ImpBasedMVA1

    Impedance2 = sqla.Column(db.Float(53))  # Impedance2. Impedance at first forced cooling MVA
    Imp_Base2 = sqla.Column(db.Float(53))  # ImpBasedMVA2

    MVAForced11 = sqla.Column(db.Float(53))  # MVAForced11
    MVAForced12 = sqla.Column(db.Float(53))  # MVAForced12
    MVAForced13 = sqla.Column(db.Float(53))  # MVAForced13
    MVAForced14 = sqla.Column(db.Float(53))  # MVAForced14
    MVAForced21 = sqla.Column(db.Float(53))  # MVAForced21
    MVAForced22 = sqla.Column(db.Float(53))  # MVAForced22
    MVAForced23 = sqla.Column(db.Float(53))  # MVAForced23
    MVAForced24 = sqla.Column(db.Float(53))  # MVAForced24

    Impedance3 = sqla.Column(db.Float(53))  # Impedance3. Impedance at third forced cooling MVA
    ImpBasedMVA3 = sqla.Column(db.Float(53))  # ImpBasedMVA3

    # it belongs to transformer , tap voltage, it s a part of the test process
    FormulaRatio2 = sqla.Column(db.Integer)  # RatioFormula2. Formula used for TTR

    # it belongs to transformer , tap voltage, it s a part of the test process
    FormulaRatio = sqla.Column(db.Integer)  # RatioFormula. Formula used for TTR
    RatioTag1 = sqla.Column(db.String(20))  # RatioTag1. Tag use for TTR
    RatioTag2 = sqla.Column(db.String(20))  # RatioTag2. Tag use for TTR
    RatioTag3 = sqla.Column(db.String(20))  # RatioTag3. Tag use for TTR
    RatioTag4 = sqla.Column(db.String(20))  # RatioTag4. Tag use for TTR
    RatioTag5 = sqla.Column(db.String(20))  # RatioTag5. Tag use for TTR
    RatioTag6 = sqla.Column(db.String(20))  # RatioTag6. Tag use for TTR
    FluidType = sqla.Column(db.Integer)  # FluidType. Insulating fluid used in equipment


    # it's a relation to bushing table column "serial number"
    BushingSerial1 = sqla.Column(db.String(15))  # BushingSerial1.
    BushingSerial2 = sqla.Column(db.String(15))  # BushingSerial2.
    BushingSerial3 = sqla.Column(db.String(15))  # BushingSerial3.
    BushingSerial4 = sqla.Column(db.String(15))  # BushingSerial4.
    BushingSerial5 = sqla.Column(db.String(15))  # BushingSerial5.
    BushingSerial6 = sqla.Column(db.String(15))  # BushingSerial6.
    BushingSerial7 = sqla.Column(db.String(15))  # BushingSerial7.
    BushingSerial8 = sqla.Column(db.String(15))  # BushingSerial8.
    BushingSerial9 = sqla.Column(db.String(15))  # BushingSerial9.
    BushingSerial10 = sqla.Column(db.String(15))  # BushingSerial10.
    BushingSerial11 = sqla.Column(db.String(15))  # BushingSerial11.
    BushingSerial12 = sqla.Column(db.String(15))  # BushingSerial12.

    # device property ,  for  transformer
    MVAActual = sqla.Column(db.Float(53))  # MVAActual. Actual MVA used
    MVARActual = sqla.Column(db.Float(53))  # MVARActual. Actual MVA used
    MWReserve = sqla.Column(db.Float(53))  # MWReserve. How much MW in reserve for backup
    MVARReserve = sqla.Column(db.Float(53))  # MVARReserve. How much MVAR in reserve for backup
    MWUltime = sqla.Column(db.Float(53))  # MWUltima. How much MW can ultimately be used in emergency
    MVARUltime = sqla.Column(db.Float(53))  # MVARUltima. How much MVAR can ultimately be used in emergency

    # transformer device property
    MVA4 = sqla.Column(db.Float(53))  # MVA4

    # it transformer property
    # QuatConnection. Quaternary windings connection on a multi phase transformer
    QuaternaryWindingConnection = sqla.Column(db.Float(53))

    # tranformer property
    BIL4 = sqla.Column(db.Float(53))  # BIL4. Tertiary Insulation level in kV
    # tranformer property
    StaticShield4 = sqla.Column(db.Float(53))  # StaticShield4. true with tertiary electrostatic shield is present

    # tranformer property
    RatioTag7 = sqla.Column(db.Float(53))  # RatioTag7. Tag use for TTR
    RatioTag8 = sqla.Column(db.Float(53))  # RatioTag8. Tag use for TTR
    FormulaRatio3 = sqla.Column(db.Float(53))  # RatioFormula3

    def __repr__(self):
        return "T"


class Breaker(BaseManager):
    __tablename__ = u'breaker'

    id = sqla.Column(db.Integer(), primary_key=True, nullable=False)

    # Assigned name given by production.
    # Production name never change but equipment may moved around. Must be careful applying a diagnostic related to a
    # Production because equipment can changed over the years and associate wrong diagnostic
    Name = sqla.Column(db.String(50))

    # EquipmentSerialNum: Equipment ID given by manufacturer.
    # Index key, along with Equipment number to uniquely identify equipment
    Serial = sqla.Column(db.String(50), primary_key=True, nullable=False, index=True)

    Manufacturer = db.Column(
        'manufacturer_id',
        db.ForeignKey("manufacturer.id"),
        nullable=False
    )

    PhaseNumber = sqla.Column(db.Boolean)  # PhaseNum. 1=single phase, 3=triphase, 6=hexaphase
    Frequency = sqla.Column(db.Integer)  # Frequency. Operating frequency
    Sealed = sqla.Column(db.Boolean)  # Sealed. Is equipment sealed.
    Manufactured = sqla.Column(db.Integer)  # ManuYear. Year manufactured
    Description = sqla.Column(db.String(50))  # Description. Describe the equipment function

    # WeldedCover. Is cover welded. Important to planned work as it is much longer to remove cover
    WeldedCover = sqla.Column(db.Boolean)

    def __repr__(self):
        return "B"


class LoadTapChanger(BaseManager):
    __tablename__ = u'tap_changer'

    id = sqla.Column(db.Integer(), primary_key=True, nullable=False)

    # Assigned name given by production.
    # Production name never change but equipment may moved around. Must be careful applying a diagnostic related to a
    # Production because equipment can changed over the years and associate wrong diagnostic
    Name = sqla.Column(db.String(50))
    Serial = sqla.Column(db.String(50), primary_key=True, nullable=False, index=True)

    Manufacturer = db.Column(
        'manufacturer_id',
        db.ForeignKey("manufacturer.id"),
        nullable=False
    )
    Manufactured = sqla.Column(db.Integer)  # ManuYear. Year manufactured
    Frequency = sqla.Column(db.Integer)  # Frequency. Operating frequency
    PhaseNumber = sqla.Column(db.Boolean)  # PhaseNum. 1=single phase, 3=triphase, 6=hexaphase
    Sealed = sqla.Column(db.Boolean)  # Sealed. Is equipment sealed.
    Description = sqla.Column(db.String(50))  # Description. Describe the equipment function
    # WeldedCover. Is cover welded. Important to planned work as it is much longer to remove cover
    WeldedCover = sqla.Column(db.Boolean)

    # it should be a test value
    # Filter. What condition is the filter. We must make this field a selection choice such Good, bad, replace etc..
    Filter = sqla.Column(db.String(30))

    # so this is test value (inspection)
    Counter = sqla.Column(db.Integer)  # Counter. Used for load tap changer or arrester (ligthning)

    # tap changer property property
    LTC4 = sqla.Column(db.Float(53))  # LTC4


    def __repr__(self):
        return "L"


class Bushing(BaseManager):
    __tablename__ = u'bushing'

    id = sqla.Column(db.Integer(), primary_key=True, nullable=False)
    Type = ['phase', 'Neutral']
    Name = sqla.Column(db.String(50))
    Serial = sqla.Column(db.String(50), primary_key=True, nullable=False, index=True)

    Manufacturer = db.Column(
        'manufacturer_id',
        db.ForeignKey("manufacturer.id"),
        nullable=False
    )
    Manufactured = sqla.Column(db.Integer)  # ManuYear. Year manufactured
    Frequency = sqla.Column(db.Integer)  # Frequency. Operating frequency
    PhaseNumber = sqla.Column(db.Boolean)  # PhaseNum. 1=single phase, 3=triphase, 6=hexaphase
    Description = sqla.Column(db.String(50))  # Description. Describe the equipment function
    BushingManufacturerH1 = sqla.Column(db.String(25))  # Bushing manufacturer for H1
    BushingManufacturerH2 = sqla.Column(db.String(25))  # Bushing manufacturer for H2
    BushingManufacturerH3 = sqla.Column(db.String(25))  # Bushing manufacturer for H3
    BushingManufacturerHN = sqla.Column(db.String(25))  # Bushing manufacturer for HN
    BushingManufacturerX1 = sqla.Column(db.String(25))  # Bushing manufacturer for X1
    BushingManufacturerX2 = sqla.Column(db.String(25))  # Bushing manufacturer for X2
    BushingManufacturerX3 = sqla.Column(db.String(25))  # Bushing manufacturer for X3
    BushingManufacturerXN = sqla.Column(db.String(25))  # Bushing manufacturer for XN
    BushingManufacturerT1 = sqla.Column(db.String(25))  # Bushing manufacturer for T1
    BushingManufacturerT2 = sqla.Column(db.String(25))  # Bushing manufacturer for T2
    BushingManufacturerT3 = sqla.Column(db.String(25))  # Bushing manufacturer for T3
    BushingManufacturerTN = sqla.Column(db.String(25))  # Bushing manufacturer for TN
    BushingManufacturerQ1 = sqla.Column(db.String(25))  # Bushing manufacturer for Q1
    BushingManufacturerQ2 = sqla.Column(db.String(25))  # Bushing manufacturer for Q2
    BushingManufacturerQ3 = sqla.Column(db.String(25))  # Bushing manufacturer for Q3
    BushingManufacturerQN = sqla.Column(db.String(25))  # Bushing manufacturer for QN
    BushingType_H = sqla.Column(db.String(25))  # Bushing type for H
    BushingType_HN = sqla.Column(db.String(25))  # Bushing type for HN
    BushingType_X = sqla.Column(db.String(25))  # Bushing type for X
    BushingType_XN = sqla.Column(db.String(25))  # Bushing type for XN
    BushingType_T = sqla.Column(db.String(25))  # Bushing type for T
    BushingType_TN = sqla.Column(db.String(25))  # Bushing type for TN
    BushingType_Q = sqla.Column(db.String(25))  # Bushing type for Q
    BushingType_QN = sqla.Column(db.String(25))  # Bushing type for QN


    def __repr__(self):
        return "B"


class Upstream(BaseManager):
    __tablename__ = u'upstream'

    id = sqla.Column(db.Integer(), primary_key=True, nullable=False)
    Name = sqla.Column(db.String(50), index=True)  # should be relation


class Downstream(BaseManager):
    __tablename__ = u'downstream'

    id = sqla.Column(db.Integer(), primary_key=True, nullable=False)
    Name = sqla.Column(db.String(50), index=True)  # should be relation


class NormParameter(BaseManager):
    __tablename__ = u'norms_params'

    id = sqla.Column(db.Integer(), primary_key=True, nullable=False)

    Norm = db.Column(
        'norm_id',
        db.ForeignKey("norms.id"),
        nullable=False
    )
    Name = sqla.Column(db.String(50), index=True)  # should be relation


class NeutralResistance(BaseManager):

    __tablename__ = u'resistance'

    id = sqla.Column(db.Integer(), primary_key=True, nullable=False)
    Name = sqla.Column(db.String(50))
    Serial = sqla.Column(db.String(50), primary_key=True, nullable=False, index=True)

    Manufacturer = db.Column(
        'manufacturer_id',
        db.ForeignKey("manufacturer.id"),
        nullable=False
    )
    # its a separate device should be splitted into another table
    NeutralResistance = sqla.Column(db.Float(53))   # NeutralResistance1.
    NeutralResistance1 = sqla.Column(db.Float(53))  # NeutralResistance1.
    NeutralResistance0 = sqla.Column(db.Boolean)    # NeutralResistance0
    NeutralResistance2 = sqla.Column(db.Float(53))  # NeutralResistance2
    NeutralResistance3 = sqla.Column(db.Float(53))  # NeutralResistance3

    # it's status or mode  of a resistance
    NeutralResistanceOpen1 = sqla.Column(db.Boolean)  # NeutralResistanceOpen1
    NeutralResistanceOpen2 = sqla.Column(db.Boolean)  # NeutralResistanceOpen2
    # property of resistence, it's status
    NeutralResistanceOpen3 = sqla.Column(db.Float(53))  # NeutralResistanceOpen3


class Equipment(BaseManager):
    """
    Equipment.  records all information about the equipment.
    """
    __tablename__ = u'equipment'

    id = sqla.Column(db.Integer(), primary_key=True, nullable=False)

    # EquipmentNumber: Equipment ID given by equipment owner.
    # Equipment number to uniquely identify equipment
    EquipmentCode = sqla.Column(db.Integer, nullable=False, index=True)  # relation to equipemt

    # EquipmentType. Define equipment by a single letter code. T:transformer, D; breaker etc...
    TypeEquipment = sqla.Column(db.String(50))

    # Location. Indicate the named placed where the equipement is.
    # Example, a main transformer is at site Budapest, and at localisation Church street.
    # Its the equivalent of the substation name.
    Location = db.Column(
        'location_id',
        db.ForeignKey("location.id"),
        nullable=False
    )

    # EditedInfo. False no changes.  True Indicates the equipment info have changed and should update information
    # while importing data from Lab.
    Modifier = sqla.Column(db.Boolean)

    Comments = sqla.Column(db.Text)  # Comments relation

    # these fields should be related to every components test , it's not a preperty of the device its a test
    VisualDate = sqla.Column(db.DateTime)  # VisualDate.  Date where was done the last visual inspection.
    VisualInspectionBy = sqla.Column(db.String(30))  # VisualInspectionBy. Who made the visual inspection. user relation
    VisualInspectionComments = sqla.Column(db.Text)  # VisualInspectionComments. Visual inspection comments,

    # test inspection of tap changer or characteristic ?
    NbrOfTapChangeLTC = sqla.Column(db.Integer)  # NbrTapChange.  Number of tap change on LTC

    # its a separate norms table for all devices
    Norm = db.Column(
        'norm_id',
        db.ForeignKey("norms.id"),
        nullable=False
    )

    # its a state of a transformer / breaker /switch /motor / cable  not
    Upstream1 = sqla.Column(db.String(100))  # Upstream1. Upstream device name
    Upstream2 = sqla.Column(db.String(100))  # Upstream2. Upstream device name
    Upstream3 = sqla.Column(db.String(100))  # Upstream3. Upstream device name
    Upstream4 = sqla.Column(db.String(100))  # Upstream4. Upstream device name
    Upstream5 = sqla.Column(db.String(100))  # Upstream5. Upstream device name

    Downstream1 = sqla.Column(db.String(100))  # Downstream1. Downstream device name
    Downstream2 = sqla.Column(db.String(100))  # Downstream2. Downstream device name
    Downstream3 = sqla.Column(db.String(100))  # Downstream3. Downstream device name
    Downstream4 = sqla.Column(db.String(100))  # Downstream4. Downstream device name
    Downstream5 = sqla.Column(db.String(100))  # Downstream5. Downstream device name

    TieLocation = sqla.Column(db.Boolean)          # TieLocation. Tie device location
    TieMaintenanceState = sqla.Column(db.Integer)  # TieMaintenanceState. Tie is open or closed during maintenance
    TieAnalysisState = sqla.Column(db.Integer)     # TieAnalysisState.

    PhysPosition = sqla.Column(db.Integer)

    # device property for all equipment
    Tension4 = sqla.Column(db.Float(53))  # Voltage4

    # Validated. Indicate equipment info has been validated and can be imported.
    Validated = sqla.Column(db.Boolean)

    # InValidation. If true, equipment information from lab must be updated before get imported into the main DB
    InValidation = sqla.Column(db.Boolean)

    # PrevSerielNum. If InValidation is true, indicate what was the previous value to retreive the correct equipment
    # information from Lab
    PrevSerialNumber = sqla.Column(db.String(50))

    # PrevEquipmentNum. If InValidation is true, indicate what was the previous value to retreive the correct equipment information from Lab
    PrevEquipmentNumber = sqla.Column(db.String(50))

    # Sibling. Unique Common Index with the other siblings.  If 0 then no sibling
    # id of a similar equipment
    Sibling = sqla.Column(db.Integer)