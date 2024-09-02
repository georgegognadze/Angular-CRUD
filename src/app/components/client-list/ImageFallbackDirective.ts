import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appImageFallback]'
})
export class ImageFallbackDirective {
  @Input() appImageFallback: string | undefined;

  constructor(private el: ElementRef) {}

  @HostListener('error') onError() {
    const imgElement = this.el.nativeElement as HTMLImageElement;
    imgElement.src = this.appImageFallback || '/assets/images/placeholder.webp';
  }
}
