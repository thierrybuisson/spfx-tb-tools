export interface IJquerySnowWebPartProps {
  description: string;
//minSize - min size of snowflake, 10 by default
 minSize:number;
//maxSize - max size of snowflake, 20 by default
maxSize:number;
//3.newOn - frequency in ms of appearing of new snowflake, 500 by default
newOn:number;
//4.flakeColor - color of snowflake, #FFFFFF by default
flakeColor : string;

//couleur
snowColor: string;
round:boolean;
shadow:boolean;
}
