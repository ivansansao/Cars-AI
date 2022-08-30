class Genetic {

    constructor() {
        this.gotCloserBest = 0;
        this.recordCloser = 0;
        this.quantidade = 4;
        this.pesos = '';
        this.shapes = '';
        this.melhor = null;
        this.melhorCorrente = null;
        this.pesos = [];
        this.shapes = '22,8;8;8,9;9';

        // Sem pista.
        this.pesos.push('');

        // Pista 1
        this.pesos.push('-0.16185849905014038,-0.04437238723039627,-1.3237130641937256,0.2876213788986206,-0.385092556476593,0.19724732637405396,0.1237185001373291,-0.06338256597518921,0.2453538477420807,-0.6997166872024536,1.410857081413269,0.32246139645576477,1.199432611465454,-0.4128447473049164,0.32923924922943115,-1.3065760135650635,0.15168942511081696,-0.07108508795499802,-0.17661991715431213,0.07175277173519135,0.23320171236991882,-0.272798627614975,0.7646384835243225,0.09415274113416672,0.06807831674814224,-0.3031100928783417,-0.11551899462938309,-0.020972825586795807,0.30205807089805603,-0.07269393652677536,-0.3349117040634155,0.2952057123184204,-0.47856825590133667,-0.13946513831615448,-0.6110274195671082,1.520184874534607,0.1623045802116394,0.19997701048851013,-0.8235505223274231,0.033160462975502014,0.33578619360923767,1.188737154006958,0.06884343177080154,1.3037086725234985,-0.09796760231256485,-0.12444498389959335,0.28243428468704224,0.5909421443939209,-0.1317303478717804,0.16166268289089203,0.35642683506011963,0.6080654263496399,-0.2894786298274994,-0.09969548135995865,-0.18787556886672974,-0.37247076630592346,0.12478846311569214,-0.9267023205757141,-0.08800050616264343,-0.2457096129655838,-0.12772005796432495,1.0642482042312622,-0.1620897650718689,0.4621514081954956,0.31308260560035706,-0.5343852639198303,-0.3469054400920868,-1.3564386367797852,0.004182605538517237,1.1538372039794922,0.18082450330257416,0.15190252661705017,0.11375369131565094,-0.506252646446228,-0.22739747166633606,-0.07488903403282166,-0.2785661518573761,0.8099858164787292,-0.035846829414367676,0.3080045282840729,0.1827273815870285,-0.6243537664413452,-0.018771793693304062,0.09771919250488281,-0.19458718597888947,-0.07943561673164368,0.24004529416561127,0.8611940145492554,-0.30244868993759155,1.3452447652816772,-0.12320582568645477,0.10487211495637894,0.21837569773197174,0.3406694531440735,-0.1392998844385147,0.2525820732116699,0.23607337474822998,0.3305451571941376,-0.37945234775543213,-0.25492599606513977,0.0682314857840538,-0.46676093339920044,-0.06115955859422684,-0.4739043712615967,0.3452170193195343,-0.31325408816337585,-0.2805209457874298,0.10767737030982971,0.13166068494319916,-0.5030214786529541,-0.0898054987192154,-0.327277272939682,0.41069135069847107,0.0333954393863678,-0.4944550693035126,-0.8328852653503418,0.3848859369754791,0.2575017511844635,0.23008418083190918,0.07410398870706558,0.49757274985313416,0.15810371935367584,0.23505420982837677,-0.572344183921814,0.15884074568748474,-0.10238425433635712,0.042895808815956116,0.33252835273742676,0.1521066427230835,-0.22623111307621002,0.26244229078292847,-0.08588148653507233,-2.720733642578125,-0.2699497938156128,-0.27051666378974915,0.1024727150797844,-0.08318343013525009,0.395197331905365,0.263071745634079,0.39213696122169495,0.29767268896102905,0.10573217272758484,0.7926983833312988,-0.3940197825431824,-0.024865301325917244,-0.32865607738494873,-0.9364618062973022,0.9848143458366394,-1.1595020294189453,0.18676576018333435,-0.019511492922902107,-1.5564467906951904,0.5025249123573303,-1.9183756113052368,0.08134669065475464,-0.5244364738464355,-0.22849886119365692,1.9314978122711182,0.19902153313159943,0.34307563304901123,-0.0020182060543447733,0.057369414716959,0.20125624537467957,-0.3094848394393921,0.27771198749542236,2.1878111362457275,-0.30896443128585815,-0.2018854320049286,0.2460600882768631,-0.1404835730791092,0.15096627175807953,-0.21715256571769714,2.1105048656463623,-0.0990428626537323,-0.02979367785155773,-0.06040643900632858;0,1.2993333339691162,0,-1.5122278928756714,-3.310288667678833,0,1.565291404724121,-0.26443052291870117;-0.9202674627304077,-0.2863459885120392,-0.20264552533626556,0.37124788761138916,0.9039772152900696,-0.9439395666122437,0.46519309282302856,-0.1224612444639206,0.6786810755729675,-1.3760827779769897,0.6986674070358276,0.30998435616493225,-1.4794461727142334,1.0476666688919067,-0.05415308475494385,0.3334486484527588,-0.5312850475311279,0.14023225009441376,-0.00895486120134592,1.935012936592102,0.563092827796936,-1.198738932609558,-1.1154136657714844,-0.3081356883049011,-0.310271292924881,1.5010926723480225,0.026366086676716805,-0.7110133767127991,-0.21397684514522552,1.2848334312438965,-0.6263017654418945,-0.43540990352630615,-2.2851455211639404,0.030620375648140907,0.7560316920280457,-0.1556524783372879,0.6402912139892578,1.818588137626648,0.33993232250213623,0.020111655816435814,-0.37478020787239075,0.8221223950386047,-0.1130407378077507,0.004149127285927534,-0.28086555004119873,1.3128257989883423,-0.744111955165863,0.16395674645900726,0.24335120618343353,1.2483513355255127,-0.552593469619751,-0.24164238572120667,-0.5527985692024231,0.09523453563451767,0.04384663328528404,0.03494676947593689,0.2000545859336853,-0.11365890502929688,-0.5390766263008118,-2.1367790699005127,-0.22851604223251343,1.5211632251739502,0.5813907384872437,-0.19258499145507812,-0.7726640105247498,-0.0587097704410553,-0.3092118501663208,0.9197566509246826,-1.4028240442276,0.4037737548351288,-0.3005206286907196,-0.6232607960700989;-0.1824028640985489,0,-1.6631824970245361,0,1.1417511701583862,0.7440764904022217,-1.6099988222122192,0.5921221971511841,1.3984278440475464');

        // Pista 2
        this.pesos.push('');

        // Pista 3
        this.pesos.push('');

        // Pista 4
        // this.pesos.push('-5.261071681976318,7.697047710418701,2.203571081161499,-1.8212167024612427,3.6573073863983154,0.6389890313148499,5.099670886993408,-2.385070323944092,-1.150908350944519,-3.470735788345337,2.7665398120880127,7.182318687438965,7.3756184577941895,3.256732225418091,1.3071719408035278,-7.215911865234375,0.5793452858924866,-0.32670846581459045,-1.1355748176574707,-0.24465692043304443,-0.37598565220832825,0.30313190817832947,-0.7573069930076599,0.31851139664649963,-0.23566052317619324,0.23550665378570557,-0.3737708032131195,0.1523585170507431,-0.374455988407135,-0.14938755333423615,-0.22802597284317017,0.5908777713775635,1.4371007680892944,-1.8587827682495117,-0.9622200131416321,-2.6230931282043457,1.94431471824646,-0.5284411311149597,-0.33634331822395325,-0.5946303009986877,-1.2076873779296875,-0.4536067545413971,0.42754247784614563,-0.24504882097244263,2.308535099029541,0.5872686505317688,-0.10301085561513901,-1.2438474893569946,-0.6190752387046814,-1.0151928663253784,-0.15630260109901428,3.3342974185943604,-3.6129696369171143,2.2925610542297363,-1.1361643075942993,2.3603675365448,-0.7006319761276245,-0.18506848812103271,0.4586108922958374,1.596917986869812,-0.6912395358085632,-1.558017373085022,0.06648275256156921,2.1426007747650146,-0.5599197149276733,-0.6684379577636719,-1.1504175662994385,-0.8301551938056946,-1.4497960805892944,1.1614081859588623,0.4100472033023834,2.6797471046447754,0.11219396442174911,-0.1438749134540558,0.33123987913131714,0.6169539093971252,-0.8772175312042236,0.05514509603381157,0.3101818859577179,-0.9154092669487,0.8042998313903809,0.0713750496506691,-0.2932884693145752,0.4235096871852875,0.3567192256450653,0.6919342279434204,0.0547611266374588,-0.1904061883687973,-0.16184473037719727,0.8658655881881714,-0.1897699385881424,1.0531435012817383,-0.5560442209243774,-0.7674413323402405,0.37072473764419556,-0.7204643487930298,-0.3326311409473419,-0.06648928672075272,-0.025533156469464302,0.3679727017879486,-1.055118203163147,0.25219011306762695,-0.10282435268163681,0.052337396889925,0.21548523008823395,1.722273588180542,-0.025030631572008133,-0.5251361727714539,1.2143584489822388,0.35039955377578735,1.0268430709838867,-1.3607758283615112,-0.2551534175872803,0.09303174912929535,0.6805242896080017,-0.4634033739566803,0.2892850637435913,0.16956470906734467,-0.13240817189216614,0.27532514929771423,-3.5128064155578613,-0.20771370828151703,-0.34901073575019836,-0.6369108557701111,-0.8918337225914001,-0.01865844801068306,-0.08590131253004074,-1.26182222366333,0.12340762466192245,-0.01467778068035841,0.32249942421913147,-0.8103790283203125,-0.712176501750946,0.25092431902885437,2.2310030460357666,-0.09785376489162445,-0.33796244859695435,-3.811225652694702,0.3337973654270172,0.3517218828201294,-1.6090452671051025,0.4592992067337036,0.06429137289524078,0.12053224444389343,0.057784296572208405,0.048963554203510284,0.25882935523986816,0.5500088930130005,-0.13916341960430145,0.06480046361684799,1.0417007207870483,0.8382617235183716,-0.5923480987548828,1.959959864616394,0.8059912919998169,-0.35389670729637146,0.22973959147930145,1.3710111379623413,-0.38694506883621216,-2.591219663619995,0.3705713152885437,1.791351556777954,0.6982812285423279,0.43238773941993713,-0.9148107767105103,-0.33282729983329773,0.5837779641151428,0.5114564299583435,1.3075145483016968,-0.06833295524120331,-0.32227814197540283,0.6463634967803955,-2.9229867458343506,0.022703753784298897,0.862972617149353,1.9775853157043457;-1.6982226371765137,-2.3947370052337646,1.37728750705719,1.7074249982833862,-2.4292097091674805,0.5119074583053589,2.3872876167297363,-5.529892444610596;-1.317972183227539,-2.071429967880249,1.0564227104187012,-0.5028740167617798,-6.681301593780518,2.919478416442871,0.945612370967865,0.2106866091489792,0.33229419589042664,-1.839990258216858,1.5682750940322876,-0.038698360323905945,0.1850433498620987,11.302881240844727,-2.0002429485321045,-5.215829849243164,0.28660351037979126,-0.1043260395526886,-1.4031096696853638,0.9362213611602783,-0.14020858705043793,0.9850816130638123,2.288630962371826,0.3532469868659973,-4.383523941040039,-1.897931694984436,1.3779352903366089,-0.6437256336212158,0.6535640954971313,-1.3356523513793945,0.6027514338493347,-7.910418510437012,0.8971246480941772,-5.772272109985352,0.20004279911518097,-0.1252327263355255,-0.2206614464521408,1.4336788654327393,-0.3607104420661926,-0.1625031679868698,13.694489479064941,-4.866091728210449,6.299354076385498,-0.3134223520755768,-0.1372402161359787,-0.39596715569496155,-4.260660171508789,-0.13704310357570648,0.04767432436347008,-8.600403785705566,9.580778121948242,-0.9511831998825073,-0.05267972871661186,0.46701890230178833,-1.4343675374984741,0.7835389971733093,-2.613287925720215,1.7518175840377808,-2.480149507522583,-1.4188494682312012,0.8076075911521912,-2.423649549484253,-0.053003910928964615,-0.04519610106945038,-2.921386241912842,-2.7113077640533447,-0.4938923120498657,-7.683753490447998,-0.5038432478904724,-1.248099684715271,-0.48919838666915894,-0.04976518452167511;-0.683844804763794,-6.6423115730285645,6.1861348152160645,-7.067042827606201,-5.536492347717285,-2.991041660308838,6.934864044189453,3.5017898082733154,-1.4833413362503052');
        // this.pesos.push('-5.192399501800537,6.706970691680908,2.1615285873413086,2.7366671562194824,1.0108076333999634,0.21340245008468628,5.986683368682861,-1.46187424659729,-0.9335238337516785,-5.505545616149902,2.819317102432251,8.885605812072754,8.559358596801758,3.3088538646698,2.20902156829834,-9.721295356750488,0.5793452858924866,-0.32670846581459045,-1.1355748176574707,-0.24465692043304443,-0.37796878814697266,0.30313190817832947,-0.7573069930076599,0.31809258460998535,-0.23566052317619324,0.22452904284000397,-0.3737708032131195,0.1523585170507431,-0.374455988407135,-0.14938755333423615,-0.22802597284317017,0.5883488655090332,1.4553759098052979,-1.8587827682495117,-0.9622200131416321,-2.6230931282043457,1.94431471824646,-0.5284411311149597,-0.3415735065937042,-0.5946303009986877,-1.2076873779296875,-0.4536067545413971,0.42754247784614563,0.6613187789916992,2.3079254627227783,0.5872686505317688,-0.10301085561513901,-1.2438474893569946,-0.6190752387046814,-1.0113263130187988,-0.15630260109901428,3.3342974185943604,-3.6158103942871094,2.2925610542297363,-1.1361643075942993,2.3768088817596436,-0.7006319761276245,-0.19703464210033417,0.4586108922958374,1.5949954986572266,-0.6912395358085632,-1.558017373085022,0.06544999033212662,2.1426007747650146,-0.5599197149276733,-0.6684379577636719,-1.1504175662994385,-0.9160688519477844,-1.4497960805892944,1.1614081859588623,0.8738844394683838,1.985323429107666,0.11219396442174911,-0.1438749134540558,0.33123987913131714,0.6169539093971252,-0.8772175312042236,0.054953210055828094,0.3101818859577179,-0.9461374282836914,0.8042998313903809,0.0713750496506691,-0.2932884693145752,0.4125119745731354,0.3570345938205719,0.6919342279434204,0.0547611266374588,-0.1904061883687973,-0.16184473037719727,0.8658655881881714,-0.1897699385881424,1.0531435012817383,-0.6405428051948547,-0.8928956985473633,0.37072473764419556,-0.7204643487930298,-0.333040326833725,-0.06648928672075272,-0.025533156469464302,0.3679727017879486,-1.055118203163147,0.25219011306762695,-0.10282435268163681,0.052337396889925,0.21548523008823395,1.722273588180542,-0.025030631572008133,-0.5251361727714539,1.2158701419830322,0.35039955377578735,1.0268430709838867,-1.3607758283615112,-0.2551534175872803,0.09303174912929535,0.6805242896080017,-0.4634033739566803,0.289409875869751,0.16956470906734467,-0.13240817189216614,0.27532514929771423,-3.5128064155578613,-0.20771370828151703,-0.34901073575019836,-0.6369108557701111,-0.8918337225914001,-0.01865844801068306,-0.08590131253004074,-1.261989951133728,0.12340762466192245,-0.01467778068035841,0.32249942421913147,-0.8103790283203125,-0.712176501750946,0.25092431902885437,2.2310030460357666,-0.10502137243747711,-0.33796244859695435,-3.811225652694702,0.3337973654270172,0.35276666283607483,-1.6090452671051025,0.4554073214530945,0.06429137289524078,0.3632902204990387,0.057784296572208405,0.048963554203510284,0.25882935523986816,0.5482071042060852,-0.13916341960430145,0.06480046361684799,1.0417007207870483,0.8365424871444702,-0.5923480987548828,1.9600777626037598,0.8059912919998169,-0.35389670729637146,0.25993961095809937,1.3710111379623413,-0.38694506883621216,-2.591219663619995,0.3705713152885437,1.791351556777954,0.6982812285423279,0.43238773941993713,-0.9148107767105103,-0.33282729983329773,0.5841181874275208,0.5114564299583435,1.3075145483016968,-0.06833295524120331,-0.32227814197540283,0.6463634967803955,-2.864311695098877,0.022703753784298897,0.862972617149353,1.9775853157043457;-1.6982226371765137,-2.3947370052337646,1.37728750705719,1.7074249982833862,-2.4292097091674805,0.5119074583053589,2.3872876167297363,-5.529892444610596;-1.317972183227539,-2.071429967880249,1.0564227104187012,-0.5028740167617798,-6.681301593780518,2.919478416442871,0.945612370967865,0.2106866091489792,0.33229419589042664,-1.839990258216858,1.5682750940322876,-0.038698360323905945,0.1850433498620987,11.302881240844727,-2.0002429485321045,-5.215829849243164,0.28660351037979126,-0.1043260395526886,-1.4031096696853638,0.9362213611602783,-0.14020858705043793,0.9850816130638123,2.288630962371826,0.3532469868659973,-4.383523941040039,-1.897931694984436,1.3779352903366089,-0.6437256336212158,0.6535640954971313,-1.3356523513793945,0.6027514338493347,-7.910418510437012,0.8971246480941772,-5.772272109985352,0.20004279911518097,-0.1252327263355255,-0.2206614464521408,1.4336788654327393,-0.3607104420661926,-0.1625031679868698,13.694489479064941,-4.866091728210449,6.299354076385498,-0.3134223520755768,-0.1372402161359787,-0.39596715569496155,-4.260660171508789,-0.13704310357570648,0.04767432436347008,-8.600403785705566,9.580778121948242,-0.9511831998825073,-0.05267972871661186,0.46701890230178833,-1.4343675374984741,0.7835389971733093,-2.613287925720215,1.7518175840377808,-2.480149507522583,-1.4188494682312012,0.8076075911521912,-2.423649549484253,-0.053003910928964615,-0.04519610106945038,-2.921386241912842,-2.7113077640533447,-0.4938923120498657,-7.683753490447998,-0.5038432478904724,-1.248099684715271,-0.48919838666915894,-0.04976518452167511;-0.683844804763794,-6.6423115730285645,6.1861348152160645,-7.067042827606201,-5.536492347717285,-2.991041660308838,6.934864044189453,3.5017898082733154,5.483341217041016');
        // this.pesos.push('-5.192399501800537,6.706970691680908,1.9438605308532715,2.7366671562194824,1.0108076333999634,0.6971948742866516,6.144110679626465,-1.46187424659729,-0.8289970755577087,-4.833803176879883,2.819317102432251,8.885605812072754,8.559358596801758,3.3088538646698,1.854465365409851,-9.721295356750488,0.5793452858924866,-0.32670846581459045,-1.1355748176574707,-0.24465692043304443,-0.37796878814697266,0.30313190817832947,-0.7573069930076599,0.31809258460998535,-0.23566052317619324,0.22452904284000397,-0.3737708032131195,0.1523585170507431,-0.374455988407135,-0.14938755333423615,-0.22802597284317017,0.5883488655090332,1.4553759098052979,-1.8587827682495117,-0.9622200131416321,-2.6230931282043457,1.94431471824646,-0.5284411311149597,-0.3415735065937042,-0.5946303009986877,-1.2076873779296875,-0.4536067545413971,0.42754247784614563,0.6613187789916992,2.3079254627227783,0.5872686505317688,-0.10301085561513901,-1.2438474893569946,-0.6190752387046814,-1.0113263130187988,-0.15630260109901428,3.3342974185943604,-3.6158103942871094,2.2925610542297363,-1.1361643075942993,2.3768088817596436,-0.7006319761276245,-0.19703464210033417,0.4586108922958374,1.5949954986572266,-0.6912395358085632,-1.558017373085022,0.06544999033212662,2.1426007747650146,-0.5599197149276733,-0.6684379577636719,-1.1504175662994385,-0.9160688519477844,-1.4497960805892944,1.1614081859588623,0.8738844394683838,1.985323429107666,0.11219396442174911,-0.1438749134540558,0.33123987913131714,0.6169539093971252,-0.8772175312042236,0.054953210055828094,0.3101818859577179,-0.9461374282836914,0.8042998313903809,0.0713750496506691,-0.2932884693145752,0.4125119745731354,0.3570345938205719,0.6919342279434204,0.0547611266374588,-0.1904061883687973,-0.16184473037719727,0.8658655881881714,-0.1897699385881424,1.0531435012817383,-0.6405428051948547,-0.8928956985473633,0.37072473764419556,-0.7204643487930298,-0.333040326833725,-0.06648928672075272,-0.025533156469464302,0.3679727017879486,-1.055118203163147,0.25219011306762695,-0.10282435268163681,0.052337396889925,0.21548523008823395,1.722273588180542,-0.025030631572008133,-0.5251361727714539,1.2158701419830322,0.35039955377578735,1.0268430709838867,-1.3607758283615112,-0.2551534175872803,0.09303174912929535,0.6805242896080017,-0.4634033739566803,0.289409875869751,0.16956470906734467,-0.13240817189216614,0.27532514929771423,-3.5128064155578613,-0.20771370828151703,-0.34901073575019836,-0.6369108557701111,-0.8918337225914001,-0.01865844801068306,-0.08590131253004074,-1.261989951133728,0.12340762466192245,-0.01467778068035841,0.32249942421913147,-0.8103790283203125,-0.712176501750946,0.25092431902885437,2.2310030460357666,-0.10502137243747711,-0.33796244859695435,-3.811225652694702,0.3337973654270172,0.35276666283607483,-1.6090452671051025,0.4554073214530945,0.06429137289524078,0.3632902204990387,0.057784296572208405,0.048963554203510284,0.25882935523986816,0.5482071042060852,-0.13916341960430145,0.06480046361684799,1.0417007207870483,0.8365424871444702,-0.5923480987548828,1.9600777626037598,0.8059912919998169,-0.35389670729637146,0.25993961095809937,1.3710111379623413,-0.38694506883621216,-2.591219663619995,0.3705713152885437,1.791351556777954,0.6982812285423279,0.08517961204051971,-0.9148107767105103,-0.33282729983329773,0.5841181874275208,0.5114564299583435,1.3075145483016968,-0.06833295524120331,-0.32227814197540283,0.6463634967803955,-2.864311695098877,0.022703753784298897,0.862972617149353,1.9775853157043457;-1.6982226371765137,-2.3947370052337646,1.37728750705719,1.7074249982833862,-2.4292097091674805,0.5119074583053589,2.3872876167297363,-5.529892444610596;-1.317972183227539,-2.071429967880249,1.0564227104187012,-0.5028740167617798,-6.681301593780518,2.919478416442871,0.945612370967865,0.2106866091489792,0.33229419589042664,-1.839990258216858,1.5682750940322876,-0.038698360323905945,0.1850433498620987,11.302881240844727,-2.0002429485321045,-5.215829849243164,0.28660351037979126,-0.1043260395526886,-1.4031096696853638,0.9362213611602783,-0.14020858705043793,0.9850816130638123,2.288630962371826,0.3532469868659973,-4.383523941040039,-1.897931694984436,1.3779352903366089,-0.6437256336212158,0.6535640954971313,-1.3356523513793945,0.6027514338493347,-7.910418510437012,0.8971246480941772,-5.772272109985352,0.20004279911518097,-0.1252327263355255,-0.2206614464521408,1.4336788654327393,-0.3607104420661926,-0.1625031679868698,13.694489479064941,-4.866091728210449,6.299354076385498,-0.3134223520755768,-0.1372402161359787,-0.39596715569496155,-4.260660171508789,-0.13704310357570648,0.04767432436347008,-8.600403785705566,9.580778121948242,-0.9511831998825073,-0.05267972871661186,0.46701890230178833,-1.4343675374984741,0.7835389971733093,-2.613287925720215,1.7518175840377808,-2.480149507522583,-1.4188494682312012,0.8076075911521912,-2.423649549484253,-0.053003910928964615,-0.04519610106945038,-2.921386241912842,-2.7113077640533447,-0.4938923120498657,-7.683753490447998,-0.5038432478904724,-1.248099684715271,-0.48919838666915894,-0.04976518452167511;-0.683844804763794,-6.6423115730285645,6.1861348152160645,-7.067042827606201,-5.536492347717285,-2.991041660308838,6.934864044189453,3.5017898082733154,5.483341217041016');
        this.pesos.push('-4.737171649932861,6.812624454498291,1.9438605308532715,2.495083808898926,1.0475349426269531,0.8293605446815491,5.427399635314941,0.48457178473472595,-2.384815216064453,-2.5021848678588867,2.7162392139434814,7.472217559814453,7.694001197814941,3.2792482376098633,2.0865931510925293,-11.79181957244873,0.5793452858924866,-0.32670846581459045,-1.1355748176574707,-0.24465692043304443,-0.37796878814697266,0.30313190817832947,-0.7573069930076599,0.31809258460998535,-0.23566052317619324,0.22452904284000397,-0.3737708032131195,0.1523585170507431,-0.374455988407135,-0.14938755333423615,-0.22802597284317017,0.5883488655090332,1.4553759098052979,-1.8587827682495117,-0.9622200131416321,-2.6230931282043457,1.94431471824646,-0.5284411311149597,-0.3415735065937042,-0.5946303009986877,-1.2076873779296875,-0.4536067545413971,0.42754247784614563,0.6536881327629089,2.3079254627227783,0.5872686505317688,-0.10301085561513901,-1.240747332572937,-0.6190752387046814,-1.0113263130187988,-0.15630260109901428,3.3342974185943604,-3.6158103942871094,2.2925610542297363,-1.1361643075942993,2.3768088817596436,-0.7006319761276245,-0.19703464210033417,0.4586108922958374,1.5949954986572266,-0.6912395358085632,-1.558017373085022,0.06544999033212662,2.1426007747650146,-0.5599197149276733,-0.6684379577636719,-1.1504175662994385,-0.9160688519477844,-1.4497960805892944,1.1614081859588623,0.8738844394683838,1.985323429107666,0.11219396442174911,-0.1438749134540558,0.33123987913131714,0.6169539093971252,-0.8772175312042236,0.054953210055828094,0.3101818859577179,-0.9461374282836914,0.8042998313903809,0.0713750496506691,-0.2932884693145752,0.4125119745731354,0.3570345938205719,0.6919342279434204,0.0547611266374588,-0.1904061883687973,-0.16184473037719727,0.8658655881881714,-0.1897699385881424,1.0531435012817383,-0.6405428051948547,-0.8928956985473633,0.37072473764419556,-0.7204643487930298,-0.333040326833725,-0.06648928672075272,-0.025533156469464302,0.3679727017879486,-1.055118203163147,0.25219011306762695,-0.10282435268163681,0.052337396889925,0.21548523008823395,1.7242401838302612,-0.025030631572008133,-0.5251361727714539,1.2158701419830322,0.35039955377578735,1.0268430709838867,-1.3607758283615112,-0.2551534175872803,0.09303174912929535,0.6805242896080017,-0.4634033739566803,0.289409875869751,0.16956470906734467,-0.13240817189216614,0.27532514929771423,-3.5128064155578613,-0.20771370828151703,-0.34901073575019836,-0.6369108557701111,-0.8918337225914001,-0.01865844801068306,-0.08590131253004074,-1.261989951133728,0.12340762466192245,-0.015745986253023148,0.32249942421913147,-0.8103790283203125,-0.7139349579811096,0.25092431902885437,2.2310030460357666,-0.10502137243747711,-0.33796244859695435,-3.811225652694702,0.3337973654270172,0.35276666283607483,-1.6090452671051025,0.4554073214530945,0.06429137289524078,0.3632902204990387,0.057784296572208405,0.048963554203510284,0.25882935523986816,0.5482071042060852,-0.14189064502716064,0.06480046361684799,1.0417007207870483,0.8365424871444702,-0.5923480987548828,1.9600777626037598,0.8059912919998169,-0.35389670729637146,0.25993961095809937,1.3710111379623413,-0.38694506883621216,-2.591219663619995,0.3705713152885437,1.791351556777954,0.6982812285423279,0.08517961204051971,-0.9148107767105103,-0.33282729983329773,0.5841181874275208,0.5114564299583435,1.3075145483016968,-0.06833295524120331,-0.32227814197540283,0.6463634967803955,-2.932324171066284,0.022703753784298897,0.862972617149353,1.9775853157043457;-1.6982226371765137,-2.3947370052337646,1.37728750705719,1.7074249982833862,-2.4292097091674805,0.5119074583053589,2.3872876167297363,-5.529892444610596;-1.317972183227539,-2.071429967880249,1.0564227104187012,-0.5028740167617798,-6.681301593780518,2.919478416442871,0.945612370967865,0.2106866091489792,0.33229419589042664,-1.839990258216858,1.5682750940322876,-0.038698360323905945,0.1850433498620987,11.302881240844727,-2.0002429485321045,-5.215829849243164,0.28660351037979126,-0.1043260395526886,-1.4031096696853638,0.9362213611602783,-0.14020858705043793,0.9850816130638123,2.288630962371826,0.3532469868659973,-4.383523941040039,-1.897931694984436,1.3779352903366089,-0.6437256336212158,0.6535640954971313,-1.3356523513793945,0.6027514338493347,-7.910418510437012,0.8971246480941772,-5.772272109985352,0.20004279911518097,-0.1252327263355255,-0.2206614464521408,1.4336788654327393,-0.3607104420661926,-0.1625031679868698,13.694489479064941,-4.866091728210449,6.299354076385498,-0.3134223520755768,-0.1372402161359787,-0.39596715569496155,-4.260660171508789,-0.13704310357570648,0.04767432436347008,-8.600403785705566,9.580778121948242,-0.9511831998825073,-0.05267972871661186,0.46701890230178833,-1.4343675374984741,0.7835389971733093,-2.613287925720215,1.7518175840377808,-2.480149507522583,-1.4188494682312012,0.8076075911521912,-2.423649549484253,-0.053003910928964615,-0.04519610106945038,-2.921386241912842,-2.7113077640533447,-0.4938923120498657,-7.683753490447998,-0.5038432478904724,-1.248099684715271,-0.48919838666915894,-0.04976518452167511;-0.683844804763794,-6.6423115730285645,6.1861348152160645,-7.067042827606201,-5.536492347717285,-2.991041660308838,6.934864044189453,3.5017898082733154,5.483341217041016');


        // this.pesos.push('');

        // Pista 5
        this.pesos.push('');

        // Pista 6
        this.pesos.push('');
    }

    firstGeneration() {

        cars = [];

        // Novos
        for (let i = 0; i < quantidade; i++) {
            cars.push(new Car());
        }

        let child = new Car('X');
        let pesos;
        if (pesosForcados != undefined) {
            pesos = this.pesos[pesosForcados];
            console.log(`Pesos da pista ${pesosForcados}`);
        } else {
            pesos = this.pesos[pista.selectedPista];
        }

        if (pesos.length > 0) {
            if (world.startWeightSaved) {
                child.ia.setWeightsFromString(pesos, this.shapes);
            }
        }
        cars.push(child);
        this.melhor = child;

        vivos = cars.length;

    }

    nextGeneration() {

        pista.reset();

        this.calcColocacao();

        if (colocacao.length == 0) {
            this.firstGeneration();
            return

        }

        const lastMelhor = this.melhor;
        
        this.melhor = this.getMelhorCarro();
        this.gotCloserBest = this.getGotCloserBest();
        
        if (this.gotCloserBest > this.recordCloser) {
            this.recordCloser = this.gotCloserBest;            
            console.log('Pesos utilizados na corriga anterior:');
            console.log(lastMelhor.ia.showWeights());
        }

        if (!this.melhor) {
            return
        }
        this.saveWeights(this.melhor);
        
        let date = new Date();
        
        console.log(`**** G${nGeracao + 1}. ${date.getHours()}:${date.getMinutes()} KM: ${this.melhor.km} Marca: ${this.melhor.marca} Quebrado: ${this.melhor.timer} Ran: ${this.melhor.ranhurasColetadas.length} Perto: ${this.gotCloserBest} Muts: ${this.melhor.ia.mutated} NM: ${this.melhor.ia.mutatedNeurons}`);
        
        //  f1: ${this.melhor.ia.f1} f2: ${this.melhor.ia.f2} 

        if (this.melhor.ranhurasColetadas.length > record) {
            foo.speak(`Atingiu ${this.melhor.ranhurasColetadas.length}!`);
            record = this.melhor.ranhurasColetadas.length;
        }

        if (this.melhor.km < pista.recordKm || this.melhor.ranhurasColetadas.length > pista.recordRanhuras) {

            pista.recordKm = this.melhor.km;
            pista.recordRanhuras = this.melhor.ranhurasColetadas.length;
            foo.speak(`quilômetro ${pista.recordKm.toFixed(0)}!`);
            this.melhor.ia.showWeights();
        }

        // pista.pistaTimeOut = ceil(this.melhor.aliveTime *1.1);

        evolucao.push(this.melhor);

        nGeracao++;
        hue = 0;

        cars = [];

        const weights = this.melhor.ia.model.getWeights();

        const weightCopies = [];
        for (let i = 0; i < weights.length; i++) {
            weightCopies[i] = weights[i].clone();
        }

        // Clonado e mutado.
        for (let i = 1; i < (quantidade / 3) * 0; i++) {

            let child = new Car('m');
            child.ia.model.setWeights(weightCopies);
            child.ia.mutate(0.1,1); // 0.1
            cars.push(child);

        }

        // Clonado e mutado.
        for (let i = 1; i < (quantidade / 3) * 3; i++) {

            let child = new Car('T');
            child.ia.model.setWeights(weightCopies);
            child.ia.mutate(0.05); // 0.1
            cars.push(child);

        }

        // Clonado (elitismo)
        if (elitism) {

            let child = new Car('c');
            child.ia.model.setWeights(weightCopies);
            cars.push(child);
        }

        vivos = cars.length;

    }

    setFlag() {

        if (pista) {
            const tmpMelhor = genetic.getMelhorCarro();
            if (tmpMelhor) {
                pista.setFlag(tmpMelhor.pos.x, tmpMelhor.pos.y, tmpMelhor.km);
                this.melhorCorrente = tmpMelhor;
            }
        }

    }

    getQuemMaisDeuReh(qtd) {

        console.log(`Primeiro: ${colocacao[0].km}`);

        let maiorReh = 0;
        let maiorI = 0;

        for (let i = 0; i < min(qtd, colocacao.length); i++) {

            car = colocacao[i];

            console.log(`${i}:  ${colocacao[i].km} -> ${colocacao[i].qtdReh}`);

            if (car.km > 0) {
                if (myRelu(colocacao[i].qtdReh) > maiorReh) {

                    maiorReh = myRelu(colocacao[i].qtdReh);
                    maiorI = i;
                }
            }
        }

        console.log('******* Maior ré é ->', colocacao[maiorI].qtdReh, ' km ', colocacao[maiorI].km, ' i: ', maiorI);
        return colocacao[maiorI];

    }

    getGotCloserBest() {

        let qtd = 0;

        if (this.melhor) {            
            for (const car of cars) {
                if (this.melhor.id != car.id) {
                    if (abs(this.melhor.km - car.km) < 100) {
                        qtd++;
                    }
                }
            }
        }

        return qtd;

    }

    getMelhorCarro() {

        
        let melhor = null;
        let km = Infinity;
        let maisRanhuras = 0;
        let lap = 0;
        let maisMuts = 0;

        // Seleciona a maior volta.
        for (const car of cars) {
            if (car.lap > lap) {
                lap = car.lap;
            }
        }

        // Mais perto do final da pista

        for (const car of cars) {

            if (car.km > 0 && car.lap == lap) {
                if (car.km < km && car.timer < pista.pistaTimeOut) {
                    km = car.km;
                    melhor = car;
                }
            }
        }

        // Carros com mais mutações.

        for (const car of cars) {

            if (car.km == km && car.lap == lap) {
                if (car.ia.mutated > maisMuts) {
                    maisMuts = car.ia.mutated;
                    melhor = car;                    
                }
                
            }
        }

        if (false) {
            
            for (const car of cars) {
    
                if (car.ranhurasColetadas.length > maisRanhuras) {
                    maisRanhuras = car.ranhurasColetadas.length;
                    melhor = car;
                }
            }
    
            if (maisRanhuras < 7 && pista.selectedPista == 2) {

                // Se empate, verifica desses qual tem melhor ângulo.

                let maiorHea = 0;

                for (const car of cars) {
                    if (car.ranhurasColetadas.length == maisRanhuras) {
                        if (car.heading > maiorHea) {
                            maiorHea = car.heading;
                            melhor = car;
                        }
                    }
                }

            } else {

                // Se empate, verifica desses qual tem melhor km.

                let maisKm = Infinity;

                for (const car of cars) {
                    if (car.ranhurasColetadas.length == maisRanhuras) {
                        if (car.km > 0) {
                            if (car.km < maisKm) {
                                maisKm = car.km;
                                melhor = car;
                            }
                        }
                    }
                }
            }
        }

        //  // Se empate, soteia um.
        //  for (const car of cars) {
        //      if (car.ranhurasColetadas.length == maisRanhuras) {
        //          if (random(1) > 0.5) {
        //              melhor = car;
        //              break;
        //          }
        //      }
        //  }

        // console.log('Mais KM() -> ', this.melhor.km, ' maisRanhuras: ', maisRanhuras, ' maisKm: ', maisKm);
        // fill(0,0,255);
        // circle(this.melhor.pos.x,this.melhor.pos.y,8);
        // noLoop();


        return melhor;
    }

    funcSalvarMelhorCarro(melhor) {
        if (salvarMelhorCarro) {
            // localStorage.setItem('meuGato', 'Tom');

            // document.cookie = "username=ivan; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/";

            // try {
            //     console.log('Salvando carro... ', this.melhor.marca);
            //     await this.melhor.ia.model.save('indexeddb://caria-melhor');
            //     console.log('Salvo');
            //     // await this.melhor.ia.model.save('localstorage://caria-melhor');
            // } catch (err) {
            //     console.error(err);
            // }
        }
    }

    funcCarregarCarroSalvo() {
        if (carregarCarroSalvo) {
            // console.log(' leitura: ',localStorage.getItem('meuGato'));
            // console.log('cookie => ',document.cookie);
            // try {

            //     console.log('Carregando carro salvo...');
            //     const melhorSalvo = await tf.loadLayersModel('indexeddb://caria-melhor');

            //     let child = new Car('X');
            //     child.ia.model = null;
            //     child.ia.model = melhorSalvo
            //     cars.push(child);

            // } catch (err) {
            //     console.error(err);
            // }
            // melhorCarregado = true;
            // console.log('Carregado!')
        }

    }
    saveWeights(car) {
        const w = car.ia.showWeights(true);
        localStorage.setItem('melhor', w);
    }

    calcColocacao() {
        colocacao = [];
        for (let car of cars) {
            colocacao.push(car);
        }
        if (colocacao.length > 0) {
            colocacao.sort(function (a, b) { return b.km < a.km });
        }

    }


}