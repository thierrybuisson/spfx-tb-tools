import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneToggle
} from '@microsoft/sp-client-preview';

import styles from './JquerySnow.module.scss';
import * as strings from 'jquerySnowStrings';
import { IJquerySnowWebPartProps } from './IJquerySnowWebPartProps';
import ModuleLoader from '@microsoft/sp-module-loader';

import { PropertyFieldFontSizePicker } from 'sp-client-custom-fields/lib/PropertyFieldFontSizePicker';
import { PropertyFieldColorPicker } from 'sp-client-custom-fields/lib/PropertyFieldColorPicker';

//require('jquery');
//import * as jQuery from 'jquery';

export default class JquerySnowWebPart extends BaseClientSideWebPart<IJquerySnowWebPartProps> {

  private guid: string;

  public constructor(context: IWebPartContext) {
    super(context);

    this.guid = this.getGuid();
    //Hack: to invoke correctly the onPropertyChange function outside this class
    //we need to bind this object on it first
    this.onPropertyChange = this.onPropertyChange.bind(this);
  }

  public render(): void {
    var html = '<div id="' + this.guid + '-snow" style="height:800px" >snowing</div> ';
    this.domElement.innerHTML = html;

    if (this.renderedOnce === false) {

     ModuleLoader.loadScript('https://code.jquery.com/jquery-2.1.1.min.js', 'jQuery').then(($: any): void => {
        //this.jQuery = $;
        ModuleLoader.loadScript('https://cdnjs.cloudflare.com/ajax/libs/JQuery-Snowfall/1.7.4/snowfall.jquery.min.js', 'jQuery').then((): void => {
          this.renderContent();
        });
      });
    }
    else {
      this.renderContent();
    }

  }


  private renderContent(): void {
    //http://www.jqueryscript.net/animation/jQuery-Plugin-To-Create-Snowfall-Animations-On-Your-Web-Page-Snowfall.html
    if (($ as any)('#' + this.guid + '-snow') != null) {
      ($ as any)('#' + this.guid + '-snow').snowfall({
        minSize:  this.properties.minSize
        , maxSize: this.properties.maxSize
        , round : this.properties.round
        , shadow : this.properties.shadow
        , minSpeed : 1
        , maxSpeed : 3
        , flakeCount : this.properties.newOn
        , flakeColor: this.properties.snowColor
      });
    }
  }


private getGuid(): string {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  private s4(): string {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
               PropertyPaneSlider('minSize', {
                  label: "Minimum Size",
                  min: 2,
                  max: 20,
                  step: 3,
                  showValue: true
                })
                ,PropertyPaneSlider('maxSize', {
                  label: "Maximum Size",
                  min: 2,
                  max: 50,
                  step: 3,
                  showValue: true
                })
                ,PropertyPaneSlider('newOn', {
                  label: "Quantity",
                  min: 1,
                  max: 400,
                  step: 5,
                  showValue: true
                })
                , PropertyPaneToggle('round', {
                  label: "Round"
                })
                , PropertyPaneToggle('shadow', {
                  label: "Shadow"
                })
                ,PropertyFieldColorPicker('snowColor', {
                  label: strings.SnowColorFieldLabel,
                  initialColor: "#4ec1db",
                  onPropertyChange: this.onPropertyChange
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
