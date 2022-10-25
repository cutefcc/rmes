type T = 'a' | 'c' | 'd';
type U = 'a';
type Filter = T extends U ? never : T;
type fil = Filter; // 'c' | 'd' ;
type OFilter = T extends U ? never : T; // 'a' | 'c' | 'd';
